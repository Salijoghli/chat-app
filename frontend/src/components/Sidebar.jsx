import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useChatStore } from "../store/useChatStore";
import { useFriendsStore } from "../store/useFriendsStore";
import { useLayoutStore } from "../store/useLayoutStore";
import { Conversation } from "./Conversation";
import { MessageSquareMore } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import classNames from "classnames";
export const Sidebar = () => {
  const onlineUsers = useFriendsStore((state) => state.onlineUsers);

  const isChatInfoOpen = useLayoutStore((state) => state.isChatInfoOpen);

  const modalRef = useRef(null);

  const selectedConversation = useChatStore(
    (state) => state.selectedConversation
  );
  const getConversations = useChatStore((state) => state.getConversations);
  const conversations = useChatStore((state) => state.conversations);
  const createConversation = useChatStore((state) => state.createConversation);

  const authUser = useAuthStore((state) => state.authUser);

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
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

  const [modalState, setModalState] = useState({
    searchQuery: "",
    selectedUsers: [],
  });
  const { searchQuery, selectedUsers } = modalState;

  const filteredFriends = useMemo(
    () =>
      authUser.friends.filter(
        (friend) =>
          friend.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !selectedUsers.some((u) => u._id === friend._id)
      ),
    [authUser.friends, searchQuery, selectedUsers]
  );

  const handleUserSelect = useCallback((friend) => {
    setModalState((prev) => ({
      ...prev,
      selectedUsers: [...prev.selectedUsers, friend],
      searchQuery: "",
    }));
  }, []);

  const removeUser = (friendId) => {
    setModalState((prev) => ({
      ...prev,
      selectedUsers: prev.selectedUsers.filter((user) => user._id !== friendId),
    }));
  };

  const handleCreateChat = useCallback(async () => {
    const ids = selectedUsers.map((user) => user._id);
    const participants = ids.reduce((acc, id) => {
      acc.push({ userId: id });
      return acc;
    }, []);
    const isGroup = selectedUsers.length > 1;
    const type = !isGroup ? "direct" : "group";
    const name = !isGroup
      ? selectedUsers[0].username
      : selectedUsers.map((user) => user.username).join(", ");

    const conversation = {
      participants,
      type,
      name,
    };

    await createConversation(conversation);

    setModalState({ searchQuery: "", selectedUsers: [] });
    modalRef.current.close();
  }, [createConversation, selectedUsers]);

  return (
    <aside className={sidebarClasses}>
      <div className="border-b border-base-300 p-5">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">Chats</p>
          <div className="tooltip tooltip-bottom" data-tip="Create new chat">
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => modalRef.current.showModal()}
            >
              <MessageSquareMore className="size-5" />
            </button>
          </div>
        </div>

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
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <p className="mb-2">To:</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedUsers.map((user) => (
              <div
                key={user._id}
                className="badge badge-primary gap-2 p-3 badge-lg"
              >
                <span>{user.username}</span>
                <button
                  className="btn btn-xs btn-ghost"
                  onClick={() => removeUser(user._id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <input
            value={searchQuery}
            onChange={(e) =>
              setModalState((prev) => ({
                ...prev,
                searchQuery: e.target.value,
              }))
            }
            placeholder="Search friends..."
            className="mt-1 input input-bordered w-full"
          />

          <div className="flex flex-col gap-2 mt-4 max-h-48 overflow-y-auto overflow-x-hidden">
            {filteredFriends
              .filter(
                (friend) => !selectedUsers.some((u) => u._id === friend._id)
              )
              .map((friend) => (
                <button
                  className="btn btn-ghost justify-start"
                  key={friend._id}
                  onClick={() => handleUserSelect(friend)}
                >
                  <img
                    className="w-8 h-8 rounded-full mr-2"
                    src={friend.profilePicture}
                    alt={friend.username}
                  />
                  <span className="text-sm">{friend.username}</span>
                </button>
              ))}
          </div>

          <div className="modal-action mt-0">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
            <button
              className="btn btn-primary"
              disabled={selectedUsers.length === 0}
              onClick={handleCreateChat}
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </aside>
  );
};
