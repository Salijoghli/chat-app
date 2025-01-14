import { useEffect, useRef, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { useChatStore } from "../store/useChatStore";
import { MessagesSkeleton } from "./MessagesSkeleton";

export const ChatContainer = () => {
  const selectedUser = useChatStore((state) => state.selectedUser);
  const messages = useChatStore((state) => state.messages);
  const loading = useChatStore((state) => state.loading);
  const getMessages = useChatStore((state) => state.getMessages);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
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
