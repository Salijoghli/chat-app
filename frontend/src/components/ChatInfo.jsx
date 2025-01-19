import { MoveLeft, Lock, Search, UserRound, Pin } from "lucide-react";
import { Link } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
import { useLayoutStore } from "../store/useLayoutStore";

export const ChatInfo = () => {
  const selectedUser = useChatStore((state) => state.selectedUser);
  const toggleChatInfo = useLayoutStore((state) => state.toggleChatInfo);

  const { profilePicture, username, _id } = selectedUser;

  return (
    <div className="w-96 rounded-lg relative bg-base-200 p-4">
      <button
        className="btn btn-circle absolute top-0 left-0 m-5"
        onClick={() => toggleChatInfo()}
      >
        <MoveLeft className="size-8" />
      </button>

      <div className="flex flex-col justify-center items-center gap-3 mt-6">
        <div className="size-40 rounded-full overflow-hidden">
          <img src={profilePicture} alt={username} />
        </div>
        <Link className="text-lg font-bold" to={`/profile/${_id}`}>
          {username}
        </Link>
        <div className="text-center flex items-center justify-center gap-2 my-1">
          <Lock size="24px" strokeWidth="1.5px" />{" "}
          <span className="font-bold">End-to-end encrypted</span>
        </div>

        <div className="flex justify-around items-center gap-6">
          <div className="flex items-center flex-col">
            <button className="btn rounded-full">
              <Search size="20px" />
            </button>
            <span>Search</span>
          </div>

          <div className="flex items-center flex-col">
            <button className="btn rounded-full">
              <UserRound size="20px" />
            </button>
            <span>Profile</span>
          </div>
        </div>
        <button className="btn w-full text-lg">
          <Pin /> View pinned messages
        </button>
      </div>
    </div>
  );
};
