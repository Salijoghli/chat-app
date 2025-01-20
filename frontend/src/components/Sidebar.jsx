import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useFriendsStore } from "../store/useFriendsStore";
import { useLayoutStore } from "../store/useLayoutStore";
import classNames from "classnames";

export const Sidebar = () => {
  const selectedUser = useChatStore((state) => state.selectedUser);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);
  const onlineUsers = useFriendsStore((state) => state.onlineUsers);
  const authUser = useAuthStore((state) => state.authUser);
  const isChatInfoOpen = useLayoutStore((state) => state.isChatInfoOpen);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredUsers = showOnlineOnly
    ? authUser.friends.filter((user) => onlineUsers.includes(user._id))
    : authUser.friends;

  const sidebarClasses = classNames(
    "h-full w-30 lg:w-72 bg-base-200 flex flex-col transition-all duration-200 rounded-lg",
    {
      "hidden lg:flex": isChatInfoOpen || selectedUser,
    }
  );

  return (
    <aside className={sidebarClasses}>
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold">Chats</p>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
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

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user, index) => (
          <button
            key={user._id || index}
            onClick={() => setSelectedUser(user)}
            className={`
            w-full p-3 flex items-center gap-3
            hover:bg-base-300 transition-colors
            ${
              selectedUser?._id === user._id
                ? "bg-base-300 ring-1 ring-base-300"
                : ""
            }
          `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePicture}
                alt={user.username}
                className="size-12 object-cover rounded-full data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10"
                data-loaded="false"
                onLoad={(event) => {
                  event.currentTarget.setAttribute("data-loaded", "true");
                }}
              />

              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.username}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};
