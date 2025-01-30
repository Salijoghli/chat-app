import expressAsyncHandler from "express-async-handler";
import Conversation from "../models/conversation.model.js";
import handleError from "../utils/handleError.js";
import { validateConversation } from "../../shared/conversationValidation.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// get conversations for user
// not including conversations removed by user
export const getConversations = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const conversations = await Conversation.find({
    participants: {
      $elemMatch: {
        userId: user._id,
      },
    },
    removedBy: { $nin: [user._id] }, // Exclude conversations removed by user
  })
    .populate({
      path: "lastMessage",
    })
    .select("-pinnedMessages -createdBy -removedBy -updatedAt -__v")
    .sort("-updatedAt");
  res.status(200).json({
    success: true,
    message: "Conversations retrieved successfully.",
    conversations,
  });
});

export const createConversation = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Validate the request body
  const { error } = validateConversation(req.body);
  if (error) {
    const errors = error.details.map((err) => err.message);
    handleError(res, 400, errors);
  }

  const { participants, name } = req.body;

  const direct = participants.length === 1;

  const type = direct ? "direct" : "group";

  // Convert participant userIds to ObjectId
  const validParticipants = await Promise.all(
    participants.map(async (participant) => {
      if (!isValidId(participant.userId)) {
        handleError(res, 400, `Invalid userId: ${participant.userId}.`);
      }

      const user = await User.findById(participant.userId);

      if (!user)
        handleError(
          res,
          404,
          `User not found for userId: ${participant.userId}.`
        );

      return {
        userId: new mongoose.Types.ObjectId(participant.userId),
      };
    })
  );

  let avatar = "";

  // Check if the conversation already exists
  if (direct) {
    const conversation = await Conversation.findOne({
      type,
      participants: {
        $all: [
          { $elemMatch: { userId: userId } },
          { $elemMatch: { userId: validParticipants[0].userId } },
        ],
      },
    });

    if (conversation) {
      conversation.removedBy = [];
      await conversation.save();
      return res.status(200).json({
        message: "Conversation already exists.",
        success: true,
        conversation,
      });
    }
    // Get the avatar of the other user
    const otherUser = validParticipants[0];
    const user = await User.findById(otherUser.userId);
    avatar = user?.profilePicture || "";
  }

  // Create the conversation
  const conversation = await Conversation.create({
    type,
    participants: [...validParticipants, { userId, role: "admin" }],
    name,
    createdBy: userId,
    avatar,
  });

  res.status(201).json({
    message: "Conversation created successfully.",
    success: true,
    conversation,
  });
});

// not actual delete, just hide conversation from user
export const deleteConversation = expressAsyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const userId = req.user._id;

  if (!isValidId(conversationId))
    handleError(res, 400, "Invalid conversation id.");

  const conversation = await Conversation.findById(conversationId);
  if (!conversation) handleError(res, 404, "Conversation not found.");

  // Check if user is a participant in the conversation
  const isParticipant = conversation.participants.some((p) =>
    p.userId.equals(userId)
  );
  if (!isParticipant)
    handleError(res, 403, "You are not a participant in this conversation.");

  // Add user to removedBy array to hide conversation from their view
  if (!conversation.removedBy.includes(userId)) {
    conversation.removedBy.push(userId);
  }

  await conversation.save();

  res.status(200).json({
    message: "Conversation deleted successfully.",
    success: true,
  });
});

export const muteConversation = expressAsyncHandler(async (req, res) => {});

export const unmuteConversation = expressAsyncHandler(async (req, res) => {});

export const leaveGroup = expressAsyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const userId = req.user._id;

  const conversation = await Conversation.findById(conversationId);
  if (!conversation) handleError(res, 404, "Conversation not found.");

  conversation.participants.pull(userId);

  await conversation.save();

  res.status(200).json({
    message: "You have left the group.",
    success: true,
  });
});

export const updateConversation = expressAsyncHandler(async (req, res) => {});
export const addAdminToGroup = expressAsyncHandler(async (req, res) => {});
export const removeAdminFromGroup = expressAsyncHandler(async (req, res) => {});
export const addParticipantToGroup = expressAsyncHandler(
  async (req, res) => {}
);
export const removeParticipantFromGroup = expressAsyncHandler(
  async (req, res) => {}
);
