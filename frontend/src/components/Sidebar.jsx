import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users } from "lucide-react";

export const Sidebar = () => {
  const selectedUser = useChatStore((state) => state.selectedUser);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);

  const authUser = useAuthStore((state) => state.authUser);

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const onlineUsers = [];

  const filteredUsers = showOnlineOnly
    ? authUser.friends.filter((user) => onlineUsers.includes(user._id))
    : authUser.friends;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
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

        {filteredUsers.length === 0 && showOnlineOnly ? (
          <div className="text-center text-zinc-500 py-4">
            No online friends
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center text-zinc-500 py-4">So Lonely</div>
        ) : null}
      </div>
    </aside>
  );
};
