import expressAsyncHandler from "express-async-handler";
import Conversation from "../models/conversation.model.js";
import handleError from "../utils/handleError.js";
import { validateConversation } from "../../shared/conversationValidation.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getConversations = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const conversations = await Conversation.find({
    participants: {
      $elemMatch: {
        userId: user._id,
      },
    },
    isArchived: { $ne: true }, // Exclude archived conversations
  })
    .populate({
      path: "lastMessage",
    })
    .select(
      "-pinnedMessages -mutedBy -isArchived -createdBy -removedBy -updatedAt -__v"
    )
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

  const { type, participants, name } = req.body;

  if (type === "direct" && participants.length > 1)
    handleError(res, 400, "Direct conversation can only have 2 participants.");

  // Convert participant userIds to ObjectId
  const validParticipants = participants.map((participant) => {
    if (!isValidId(participant.userId)) {
      handleError(res, 400, `Invalid userId: ${participant.userId}.`);
    }

    const user = User.findById(participant.userId);

    if (!user)
      handleError(
        res,
        404,
        `User not found for userId: ${participant.userId}.`
      );

    return {
      userId: new mongoose.Types.ObjectId(participant.userId),
    };
  });

  const isGroup = type === "group";

  let avatar = "";
  let username = "";

  // If direct conversation, check if the conversation already exists
  if (!isGroup) {
    const existingConversation = await Conversation.findOne({
      type: "direct",
      participants: {
        $elemMatch: {
          userId: {
            $in: [userId, ...validParticipants.map((p) => p.userId)],
          },
        },
      },
    });

    if (existingConversation) {
      return res.status(200).json({
        message: "Direct conversation already exists.",
        success: true,
        existingConversation,
      });
    }
    // Get the avatar of the other user
    const otherUser = validParticipants[0];
    const user = await User.findById(otherUser.userId);
    avatar = user.profilePicture;
    username = user.username;
  }

  // Create the conversation
  const conversation = new Conversation({
    type,
    participants: [...validParticipants, { userId, role: "admin" }],
    name: isGroup ? name : username,
    createdBy: isGroup ? userId : undefined,
    avatar,
  });

  await conversation.save();

  res.status(201).json({
    message: "Conversation created successfully.",
    success: true,
    conversation: {
      _id: conversation._id,
      type: conversation.type,
      participants: conversation.participants,
      name: conversation.name,
      avatar: conversation.avatar,
      createdBy: conversation.createdBy,
    },
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
export const deleteConversation = expressAsyncHandler(async (req, res) => {});

export const muteConversation = expressAsyncHandler(async (req, res) => {});
export const unmuteConversation = expressAsyncHandler(async (req, res) => {});
export const archiveConversation = expressAsyncHandler(async (req, res) => {});
export const unarchiveConversation = expressAsyncHandler(
  async (req, res) => {}
);

export const leaveGroup = expressAsyncHandler(async (req, res) => {});
