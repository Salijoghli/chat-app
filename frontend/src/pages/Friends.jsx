const Friends = () => {
  // Placeholder data with profile pictures
  const friends = [
    {
      id: 1,
      name: "Alice",
      requestId: 101,
      profilePicture: "https://picsum.photos/50",
    },
    {
      id: 2,
      name: "Bob",
      requestId: 102,
      profilePicture: "https://picsum.photos/50",
    },
    {
      id: 3,
      name: "Charlie",
      requestId: 103,
      profilePicture: "https://picsum.photos/50",
    },
  ];

  // Simulate actions
  const handleSendMessage = (friendId) => {
    console.log(`Sent message to ID: ${friendId}`);
  };

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl">
          <div className="p-4">
            {/* Friends Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Your Friends</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="card bg-base-200 shadow-md rounded-lg p-4"
                  >
                    <div className="flex items-center">
                      <img
                        src={friend.profilePicture}
                        alt={friend.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{friend.name}</h3>
                        <button
                          onClick={() => handleSendMessage(friend.id)}
                          className="btn btn-primary mt-2"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
