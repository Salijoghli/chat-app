import { validateSendMessage } from "../../shared/messageValidation.js";
import expressAsyncHandler from "express-async-handler";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import handleError from "../utils/handleError.js";

export const sendMessage = expressAsyncHandler(async (req, res) => {
  const { message } = req.body;

  const { error } = validateSendMessage({ message });
  if (error) {
    const errors = error.details.map((err) => err.message);
    console.log(error);
    handleError(res, 400, errors);
  }

  const { id: receiverId } = req.params;

  if (!isValidId(receiverId)) handleError(res, 400, "Invalid receiver ID.");

  const senderId = req.user._id;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation)
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });

  conversation.messages.push(newMessage._id);

  await Promise.all([newMessage.save(), conversation.save()]);

  res.status(201).json(newMessage);
});

export const getMessages = expressAsyncHandler(async (req, res) => {
  const { id: receiverId } = req.params;

  const senderId = req.user._id;

  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  }).populate("messages");

  if (!conversation) return res.status(200).json([]);

  res.status(200).json(conversation.messages);
});

export const editMessage = expressAsyncHandler(async (req, res) => {});

export const deleteMessage = expressAsyncHandler(async (req, res) => {});

export const replyToMessage = expressAsyncHandler(async (req, res) => {});
