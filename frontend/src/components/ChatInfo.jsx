import { MoveLeft, Lock, Search, UserRound, Pin } from "lucide-react";
import { Link } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
import { useLayoutStore } from "../store/useLayoutStore";

export const ChatInfo = () => {
  const selectedUser = useChatStore((state) => state.selectedUser);
  const toggleChatInfo = useLayoutStore((state) => state.toggleChatInfo);

  const { profilePicture, username, _id } = selectedUser;

  return (
    <div className="w-full h-full bg-base-200 flex flex-col self-center">
      {/* Header */}
      <div className="relative p-4">
        <button
          className="btn btn-ghost btn-circle m-4 absolute left-0 top-0 flex xl:hidden"
          onClick={() => toggleChatInfo()}
        >
          <MoveLeft className="size-6" />
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center px-6 py-8 border-b border-base-300">
        <div className="size-32 rounded-full overflow-hidden ring-2 ring-base-300 ring-offset-2 ring-offset-base-200">
          <img
            src={profilePicture}
            alt={username}
            className="size-full object-cover"
          />
        </div>
        <Link
          className="mt-4 text-xl font-bold hover:underline"
          to={`/profile/${_id}`}
        >
          {username}
        </Link>
        <div className="mt-2 text-sm text-base-content/70 flex items-center gap-1.5">
          <Lock className="size-4" />
          <span>End-to-end encrypted</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 border-b border-base-300">
        <button className="btn btn-ghost flex flex-col gap-2 h-auto py-4">
          <div className="size-12 rounded-full bg-base-300 flex items-center justify-center">
            <Search className="size-5" />
          </div>
          <span className="text-sm">Search</span>
        </button>

        <button className="btn btn-ghost flex flex-col gap-2 h-auto py-4">
          <div className="size-12 rounded-full bg-base-300 flex items-center justify-center">
            <UserRound className="size-5" />
          </div>
          <span className="text-sm">Profile</span>
        </button>
      </div>

      {/* Additional Actions */}
      <div className="p-4">
        {/* TODO pinned messages */}
        <button className="btn btn-ghost justify-center w-full gap-3">
          <Pin className="size-5" />
          <span>View pinned messages</span>
        </button>
      </div>
    </div>
  );
};
