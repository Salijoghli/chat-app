import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { formatError } from "../utils/formatError.js";
import { useAuthStore } from "./useAuthStore.js";
import toast from "react-hot-toast";

export const useFriendsStore = create((set) => ({
  users: [],
  requests: [],
  loading: {
    users: false,
    requests: false,
    action: false,
    id: null,
  },
  error: {
    users: false,
    requests: false,
    action: false,
  },
  onlineUsers: [],
  getUsers: async () => {
    set((state) => ({ loading: { ...state.loading, users: true } }));
    try {
      const res = await axiosInstance.get("/users");
      set({ users: res.data.users });
    } catch (error) {
      set((state) => ({ error: { ...state.error, users: true } }));
      toast.error(formatError(error), { duration: 5000 });
    } finally {
      set((state) => ({ loading: { ...state.loading, users: false } }));
    }
  },

  getRequests: async () => {
    set((state) => ({ loading: { ...state.loading, requests: true } }));
    try {
      const response = await axiosInstance.get("/friends/pending");
      set({ requests: response.data.requests });
    } catch (error) {
      set((state) => ({ error: { ...state.error, requests: true } }));
      toast.error(formatError(error), { duration: 5000 });
    } finally {
      set((state) => ({ loading: { ...state.loading, requests: false } }));
    }
  },

  // Accept a friend request
  acceptRequest: async (request) => {
    const {
      _id,
      sender: { username, profilePicture, _id: id },
    } = request;
    set((state) => ({ loading: { ...state.loading, action: true, id: _id } }));
    try {
      await axiosInstance.post(`/friends/accept/${_id}`);
      // Update the authUser state
      useAuthStore.setState((state) => ({
        authUser: {
          ...state.authUser,
          friends: [
            ...state.authUser.friends,
            {
              _id: id,
              username: username,
              profilePicture: profilePicture,
            },
          ],
        },
      }));
      // Remove the request from the requests array
      set((state) => ({
        requests: state.requests.filter((request) => request._id !== _id),
      }));
      toast.success("Friend request accepted");
    } catch (error) {
      toast.error(formatError(error), { duration: 5000 });
      set((state) => ({ error: { ...state.error, action: true } }));
    } finally {
      set((state) => ({
        loading: { ...state.loading, action: false, id: null },
      }));
    }
  },
  sendRequest: async (userId) => {
    set((state) => ({
      loading: { ...state.loading, action: true, id: userId },
    }));
    try {
      await axiosInstance.post(`/friends/send/${userId}`);
      toast.success("Friend request sent");
    } catch (error) {
      toast.error(formatError(error), { duration: 5000 });
      set((state) => ({ error: { ...state.error, action: true } }));
    } finally {
      set((state) => ({
        loading: { ...state.loading, action: false, id: null },
      }));
    }
  },
  removeFriend: async (friendId) => {
    set((state) => ({
      loading: { ...state.loading, action: true, id: friendId },
    }));
    try {
      await axiosInstance.delete(`/friends/remove/${friendId}`);

      useAuthStore.setState((state) => ({
        authUser: {
          ...state.authUser,
          friends: state.authUser.friends.filter(
            (friend) => friend._id !== friendId
          ),
        },
      }));

      toast.success("Friend removed successfully");
    } catch (error) {
      toast.error(formatError(error), { duration: 5000 });
      set((state) => ({ error: { ...state.error, action: true } }));
    } finally {
      set((state) => ({
        loading: { ...state.loading, action: false, id: null },
      }));
    }
  },
}));
