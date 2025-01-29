import { useChatStore } from "../store/useChatStore";
import classNames from "classnames";
export const Conversation = ({ conversation }) => {
  const setSelectedConversation = useChatStore(
    (state) => state.setSelectedConversation
  );
  const selectedConversation = useChatStore(
    (state) => state.selectedConversation
  );
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);

  const handleClick = () => {
    setSelectedConversation(conversation);
    setSelectedUser(conversation.participants[0]);
  };
  const { avatar, lastMessage, name } = conversation;
  return (
    <button
      onClick={handleClick}
      className={classNames(
        "w-full p-3 flex items-center gap-3 rounded-xl hover:bg-base-300 transition-colors ",
        {
          "bg-base-300 ring-1 ring-base-300":
            selectedConversation?._id === conversation._id,
        }
      )}
    >
      <div className="relative flex-shrink-0">
        <img
          src={avatar || "/avatar.png"}
          alt={name}
          className="size-12 object-cover rounded-full data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10"
          data-loaded="false"
          onLoad={(event) => {
            event.currentTarget.setAttribute("data-loaded", "true");
          }}
        />
      </div>

      <div className="text-left flex-1 min-w-0">
        <div className="font-medium truncate max-w-full">{name}</div>
        <div className="text-sm text-zinc-400 truncate max-w-full">
          {lastMessage?.content || "No messages"}
        </div>
      </div>
    </button>
  );
};
