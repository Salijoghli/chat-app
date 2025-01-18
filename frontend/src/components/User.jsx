import { useFriendsStore } from "../store/useFriendsStore";
import { Card } from "./Card";
export const User = ({ user }) => {
  const sendRequest = useFriendsStore((state) => state.sendRequest);
  const loadingId = useFriendsStore((state) => state.loading.id);

  // Check if this specific user is loading
  const isLoading = loadingId === user._id;

  return (
    <Card connection={user}>
      <button
        className="btn btn-sm btn-accent text-xs"
        disabled={isLoading}
        onClick={async () => sendRequest(user._id)}
      >
        {isLoading ? "Loading..." : "Add Friend"}
      </button>
    </Card>
  );
};
