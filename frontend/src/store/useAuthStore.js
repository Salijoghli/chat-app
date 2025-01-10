import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const formatError = (error) => {
  const errorMessage =
    error.response?.data?.message ||
    error.response?.statusText ||
    "An error occurred. Please try again later.";
  return errorMessage;
};

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isSignupError: false,
  isLoggingIn: false,
  isLoggingInError: false,
  isUpdatingProfile: false,
  isUpdatingProfileError: false,
  isCheckingAuth: true,
  onlineUsers: [],
  setFieldStatus: (field, status) => {
    set({ [field]: status });
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/user");
      set({ authUser: res.data });
    } catch {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data.user });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(formatError(error), { duration: 5000 });
      set({ isSignupError: true });
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.user });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(formatError(error), { duration: 5000 });
      set({ isLoggingInError: true });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(formatError(error));
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.patch("/auth/update", data);
      set({ authUser: res.data.user });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(formatError(error), { duration: 5000 });
      set({ isUpdatingProfileError: true });
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
