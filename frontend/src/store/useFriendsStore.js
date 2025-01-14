import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { formatError } from "../utils/formatError.js";
import toast from "react-hot-toast";

export const useFriendsStore = create((get, set) => ({
  users: [],
  loading: {
    users: false,
  },
  error: {
    users: false,
  },
  onlineUsers: [],
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/users");
      set({ users: res.data.users });
    } catch (error) {
      toast.error(formatError(error), { duration: 5000 });
    } finally {
      set({ isUsersLoading: false });
    }
  },
}));
