import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useNavigate } from "react-router-dom";

const Friends = () => {
  const { authUser } = useAuthStore();
  const { setSelectedUser } = useChatStore();

  const navigate = useNavigate();

  const sendMessage = (friend) => {
    setSelectedUser(friend);
    navigate("/");
  };

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-lg w-full max-w-6xl">
          <div className="p-4">
            {/* Friends Section */}
            <h2 className="text-2xl font-semibold mb-4">Your Friends</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {authUser.friends.map((friend, index) => (
                <div
                  key={friend.id || index}
                  className="card bg-base-200 shadow-md rounded-lg p-6 flex flex-col items-center text-center"
                >
                  <img
                    src={friend.profilePicture}
                    alt={friend.username}
                    className="object-contain rounded-full"
                  />
                  <h3 className="text-lg font-semibold mb-2">{friend.name}</h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => navigate(`/profile/${friend.id}`)}
                      className="btn btn-primary mt-2"
                    >
                      Check Profile
                    </button>
                    <button
                      onClick={() => sendMessage(friend)}
                      className="btn btn-primary mt-2"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
