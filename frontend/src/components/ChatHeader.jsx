import { Ellipsis } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useFriendsStore } from "../store/useFriendsStore";
import { useLayoutStore } from "../store/useLayoutStore";

export const ChatHeader = () => {
  const selectedUser = useChatStore((state) => state.selectedUser);
  const onlineUsers = useFriendsStore((state) => state.onlineUsers);
  const toggleChatInfo = useLayoutStore((state) => state.toggleChatInfo);
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePicture}
                alt={selectedUser.username}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.username}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => toggleChatInfo()}>
          <Ellipsis />
        </button>
      </div>
    </div>
  );
};
