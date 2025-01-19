import { useEffect } from "react";
import { useFriendsStore } from "../store/useFriendsStore";
import { Card } from "./Card";
export const User = ({ user }) => {
  const sendRequest = useFriendsStore((state) => state.sendRequest);
  const loadingId = useFriendsStore((state) => state.loading.id);
  const sentRequests = useFriendsStore((state) => state.sentRequests);
  const cancelRequest = useFriendsStore((state) => state.cancelRequest);
  const getSentRequests = useFriendsStore((state) => state.getSentRequests);
  const loading = useFriendsStore((state) => state.loading.action);

  useEffect(() => {
    getSentRequests();
  }, [getSentRequests]);

  // Check if this specific user is loading
  const isLoading = loading && loadingId === user._id;

  const sentRequest = sentRequests?.find(
    (request) => request?.receiver?._id === user._id
  );

  const handleClick = async () => {
    if (sentRequest) {
      await cancelRequest(sentRequest._id);
      await getSentRequests();
    } else {
      await sendRequest(user._id);
      await getSentRequests();
    }
  };
  return (
    <Card connection={user}>
      <button
        className={`btn btn-sm text-xs ${
          sentRequest ? "btn-error hover:btn-error" : "btn-accent"
        } transition-colors`}
        disabled={isLoading}
        onClick={handleClick}
      >
        {isLoading
          ? "Loading..."
          : sentRequest
          ? "Cancel Request"
          : "Add Friend"}
      </button>
    </Card>
  );
};
