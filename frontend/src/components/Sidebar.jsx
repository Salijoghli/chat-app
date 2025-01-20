import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
// import { useAuthStore } from "../store/useAuthStore";
import { useFriendsStore } from "../store/useFriendsStore";
import { useLayoutStore } from "../store/useLayoutStore";
import classNames from "classnames";

// Dummy data for testing
const dummyUsers = [
  {
    _id: "1",
    username: "John Doe",
    profilePicture: "/avatar.png",
    lastMessage: "Hey! How are you doing?",
  },
  {
    _id: "2",
    username: "Jane Smith",
    profilePicture: "/avatar.png",
    lastMessage: "Let's catch up tomorrow.",
  },
  {
    _id: "3",
    username: "Sam Wilson",
    profilePicture: "/avatar.png",
    lastMessage:
      "See you at the meeting. lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];

export const Sidebar = () => {
  const selectedUser = useChatStore((state) => state.selectedUser);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);
  const onlineUsers = useFriendsStore((state) => state.onlineUsers);
  // const authUser = useAuthStore((state) => state.authUser);
  const isChatInfoOpen = useLayoutStore((state) => state.isChatInfoOpen);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredUsers = showOnlineOnly
    ? dummyUsers.filter((user) => onlineUsers.includes(user._id))
    : dummyUsers;

  const sidebarClasses = classNames(
    "h-full w-full max-w-md bg-base-200 flex flex-col transition-all duration-200 rounded-lg",
    {
      "hidden lg:flex": isChatInfoOpen || selectedUser,
    }
  );

  return (
    <aside className={sidebarClasses}>
      <div className="border-b border-base-300 p-5">
        <p className="text-2xl font-bold">Chats</p>
        <div className="flex mt-3 items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto overflow-x-hidden w-full py-3">
        {filteredUsers.map((user, index) => (
          <button
            key={user._id || index}
            onClick={() => setSelectedUser(user)}
            className={classNames(
              "w-full p-3 flex items-center gap-3 rounded-xl hover:bg-base-300 transition-colors ",
              {
                "bg-base-300 ring-1 ring-base-300":
                  selectedUser?._id === user._id,
              }
            )}
          >
            <div className="relative flex-shrink-0">
              <img
                src={user.profilePicture}
                alt={user.username}
                className="size-12 object-cover rounded-full data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10"
                data-loaded="false"
                onLoad={(event) => {
                  event.currentTarget.setAttribute("data-loaded", "true");
                }}
              />
            </div>

            <div className="text-left flex-1 min-w-0">
              <div className="font-medium truncate max-w-full">
                {user.username}
              </div>
              <div className="text-sm text-zinc-400 truncate max-w-full">
                {user.lastMessage}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};
