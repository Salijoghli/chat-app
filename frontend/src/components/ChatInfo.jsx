import {
  MoveLeft,
  Lock,
  Search,
  UserRound,
  Pin,
  Bell,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
import { useLayoutStore } from "../store/useLayoutStore";
import { useState } from "react";

export const ChatInfo = () => {
  const toggleChatInfo = useLayoutStore((state) => state.toggleChatInfo);

  const selectedConversation = useChatStore(
    (state) => state.selectedConversation
  );

  const { avatar, name, type, participants } = selectedConversation;

  const [image, setImage] = useState(avatar);

  return (
    <div className="w-full lg:max-w-96 h-full bg-base-200 flex flex-col rounded-lg m-auto">
      {/* Header */}
      <div className="relative p-4">
        <button
          className="btn btn-ghost btn-circle absolute left-5 top-3 lg:hidden"
          onClick={() => toggleChatInfo()}
        >
          <MoveLeft className="size-6" />
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <img
          src={avatar || image || "/avatar.png"}
          alt={name}
          className="size-24 rounded-full overflow-hidden object-cover"
        />
        {type === "direct" ? (
          <>
            <Link
              className="mt-4 text-lg font-bold hover:underline"
              to={`/profile/${participants[0]._id}`}
            >
              {name}
            </Link>
            <div className="mt-2 text-sm text-base-content/70 flex items-center gap-1.5">
              <Lock className="size-4" />
              <span>End-to-end encrypted</span>
            </div>
          </>
        ) : (
          <h1 className="mt-4 text-lg font-bold">{name}</h1>
        )}
      </div>

      <div className="flex items-center justify-center gap-3 my-4">
        <div className="flex flex-col gap-1 items-center justify-center">
          <button className="btn btn-md btn-outline">
            <Bell className="size-5" />
          </button>
          <span className="text-sm">Mute</span>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <button className="btn btn-md btn-outline">
            <Search className="size-5" />
          </button>
          <span className="text-sm">Search</span>
        </div>
      </div>

      <button className="btn btn-ghost justify-start w-full gap-3">
        <Pin className="size-5" />
        <span>View pinned messages</span>
      </button>

      {type === "group" && (
        <div
          tabIndex={0}
          className="collapse collapse-arrow rounded-lg btn-ghost group"
        >
          <input type="checkbox" />
          <div className="collapse-title font-bold flex items-center gap-2">
            <Users className="size-5" />
            <span>Chat Members</span>
          </div>
          <div className="collapse-content">
            {participants.map((participant) => (
              <div key={participant._id} className="">
                <span>{participant.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {type === "direct" && (
        <Link
          to={`/profile/${participants[0]._id}`}
          className="btn btn-ghost flex flex-col gap-2 h-auto py-4"
        >
          <div className="size-12 rounded-full bg-base-300 flex items-center justify-center">
            <UserRound className="size-5" />
          </div>
          <span className="text-sm">Profile</span>
        </Link>
      )}

      {type === "group" && (
        <button className="btn btn-ghost flex flex-col gap-2 h-auto py-4">
          <div className="size-12 rounded-full bg-base-300 flex items-center justify-center">
            <UserRound className="size-5" />
          </div>
          <span className="text-sm">Leave Group</span>
        </button>
      )}
    </div>
  );
};
