import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useFriendsStore } from "../store/useFriendsStore";
import { useLayoutStore } from "../store/useLayoutStore";
import { Conversation } from "./Conversation";
import classNames from "classnames";

export const Sidebar = () => {
  const onlineUsers = useFriendsStore((state) => state.onlineUsers);
  const isChatInfoOpen = useLayoutStore((state) => state.isChatInfoOpen);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const selectedConversation = useChatStore(
    (state) => state.selectedConversation
  );
  const getConversations = useChatStore((state) => state.getConversations);

  const conversations = useChatStore((state) => state.conversations);

  useEffect(() => {
    getConversations();
  }, [getConversations]);

  const filteredConversations = conversations;

  const sidebarClasses = classNames(
    "h-full w-full max-w-md bg-base-200 flex flex-col transition-all duration-200 rounded-lg",
    {
      "hidden lg:flex": isChatInfoOpen || selectedConversation,
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
        {filteredConversations.map((conversation) => (
          <Conversation key={conversation._id} conversation={conversation} />
        ))}
      </div>
    </aside>
  );
};
