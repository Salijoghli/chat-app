import { useEffect } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { useChatStore } from "../store/useChatStore";
import { useLayoutStore } from "../store/useLayoutStore";
import { MessagesSkeleton } from "./MessagesSkeleton";
import classNames from "classnames";

export const ChatContainer = () => {
  // const messages = useChatStore((state) => state.messages);
  const loading = useChatStore((state) => state.loading);
  // const getMessages = useChatStore((state) => state.getMessages);
  const isChatInfoOpen = useLayoutStore((state) => state.isChatInfoOpen);
  // const selectedConversation = useChatStore(
  //   (state) => state.selectedConversation
  // );

  // useEffect(() => {
  //   getMessages();
  // }, [getMessages]);

  const containerClasses = classNames(
    "flex-1 sm:flex flex-col overflow-auto bg-base-200 rounded-lg",
    {
      hidden: isChatInfoOpen,
    }
  );

  return (
    <div className={containerClasses}>
      <ChatHeader />

      {loading ? (
        <MessagesSkeleton />
      ) : (
        <>
          <p>messages</p>
          <MessageInput />
        </>
      )}
    </div>
  );
};
