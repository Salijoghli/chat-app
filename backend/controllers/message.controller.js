import expressAsyncHandler from "express-async-handler";
import { validateSendMessage } from "../../shared/messageValidation.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import handleError from "../utils/handleError.js";
import mongoose from "mongoose";

export const sendMessage = expressAsyncHandler(async (req, res) => {
  const { message } = req.body;

  const { error } = validateSendMessage({ message });
  if (error) {
    const errors = error.details.map((err) => err.message);
    console.log(error);
    handleError(res, 400, errors);
  }

  const { id: receiverId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(receiverId))
    handleError(res, 400, "Invalid receiver ID.");

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

export const getMessages = async (req, res) => {
  res.send("Get messages");
};
