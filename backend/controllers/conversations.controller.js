import expressAsyncHandler from "express-async-handler";
import Conversation from "../models/conversation.model.js";

export const getConversations = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const conversations = await Conversation.find({
    participants: { $in: [user._id] },
  }).populate("participants");
  res.status(200).json(conversations);
});
export const createConversation = expressAsyncHandler(async (req, res) => {});
export const updateConversation = expressAsyncHandler(async (req, res) => {});
export const addAdminToGroup = expressAsyncHandler(async (req, res) => {});
export const removeAdminFromGroup = expressAsyncHandler(async (req, res) => {});
export const addParticipantToGroup = expressAsyncHandler(
  async (req, res) => {}
);
export const removeParticipantFromGroup = expressAsyncHandler(
  async (req, res) => {}
);
export const pinMessage = expressAsyncHandler(async (req, res) => {});
export const unpinMessage = expressAsyncHandler(async (req, res) => {});
export const deleteConversation = expressAsyncHandler(async (req, res) => {});
