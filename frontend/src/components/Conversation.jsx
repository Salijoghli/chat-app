import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import {
  Ellipsis,
  Trash,
  Archive,
  Bell,
  BellOff,
  User,
  MessageCircleX,
} from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
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

  const deleteConversation = useChatStore((state) => state.deleteConversation);

  const dropdownRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState("");

  const authUser = useAuthStore((state) => state.authUser);

  const isMuted = conversation.mutedBy.includes(authUser._id);
  const isGroup = conversation.type === "group";

  const actions = useMemo(
    () => [
      {
        key: "mute",
        label: "Mute Notifications",
        icon: BellOff,
        visible: !isMuted,
        action: () => {},
      },

      {
        key: "unmute",
        label: "Unmute Notifications",
        icon: Bell,
        visible: isMuted,
        action: () => {},
      },
      {
        key: "delete",
        label: "Delete Chat",
        icon: Trash,
        visible: true,
        action: () => deleteConversation(conversation._id),
      },
      {
        key: "archive",
        label: "Archive Chat",
        icon: Archive,
        visible: true,
        action: () => {},
      },
      {
        key: "profile",
        label: "View Profile",
        icon: User,
        visible: !isGroup,
        action: () => {},
      },
      {
        key: "leave",
        label: "Leave Chat",
        icon: MessageCircleX,
        visible: isGroup,
        action: () => {},
      },
    ],
    [isGroup, isMuted, conversation._id, deleteConversation]
  );

  // This is to make the dropdown position relative to the conversation
  useEffect(() => {
    function updateDropdownPosition() {
      if (dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        if (spaceBelow >= rect.height && spaceBelow > spaceAbove) {
          setDropdownPosition("");
        } else if (spaceAbove >= rect.height) {
          setDropdownPosition("dropdown-top");
        } else {
          setDropdownPosition("");
        }
      }
    }

    window.addEventListener("resize", updateDropdownPosition);
    updateDropdownPosition(); // Run once when the component mounts

    return () => window.removeEventListener("resize", updateDropdownPosition);
  }, []);

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
          {lastMessage?.content}
        </div>
      </div>
      <div
        ref={dropdownRef}
        className={`dropdown dropdown-end ${dropdownPosition}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div tabIndex={0} role="button" className="btn">
          <Ellipsis />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu shadow-inner ring-1 ring-gray-200 bg-base-200 rounded-box z-[1] w-80"
        >
          {actions.map((action) => {
            if (!action.visible) return null;

            return (
              <div
                key={action.key}
                className="btn btn-block justify-start"
                onClick={() => action.action()}
              >
                <action.icon className="size-5" />
                {action.label}
              </div>
            );
          })}
        </ul>
      </div>
    </button>
  );
};
