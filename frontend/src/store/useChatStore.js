import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { formatError } from "../utils/formatError.js";

import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  selectedConversation: null,
  selectedUser: null, // Selected user in the chat
  conversations: [],
  messages: [],
  loading: false,
  error: false,
  setSelectedUser: (user) => set({ selectedUser: user }),
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),
  getMessages: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(
        `/messages/${get().selectedUser._id}`
      );
      set({ messages: res.data.messages });
    } catch (error) {
      toast.error(formatError(error), { duration: 5000 });
    } finally {
      set({ loading: false });
    }
  },
  getConversations: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/conversations");
      set({ conversations: res.data.conversations });
    } catch (error) {
      toast.error(formatError(error), { duration: 5000 });
    } finally {
      set({ loading: false });
    }
  },
  createConversation: async (details) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/conversations", details);
      if (res.data.existingConversation) {
        set({ selectedConversation: res.data.existingConversation });
        toast.success("Already in conversation with this user");
      } else {
        set({ conversations: [...get().conversations, res.data.conversation] });
        set({ selectedConversation: res.data.conversation });
      }
    } catch (error) {
      toast.error(formatError(error), { duration: 5000 });
    } finally {
      set({ loading: false });
    }
  },
  deleteConversation: async (conversationId) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.delete(
        `/conversations/${conversationId}`
      );
      toast.success(res.data.message);

      if (get().selectedConversation._id === conversationId) {
        set({ selectedConversation: null });
      }

      set({
        conversations: get().conversations.filter(
          (conversation) => conversation._id !== conversationId
        ),
      });
    } catch (error) {
      toast.error(formatError(error), { duration: 5000 });
    } finally {
      set({ loading: false });
    }
  },
}));
