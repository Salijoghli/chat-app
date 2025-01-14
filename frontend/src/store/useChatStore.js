import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { formatError } from "../utils/formatError.js";

import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
  messages: [],
  loading: false,
  error: false,
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
}));
