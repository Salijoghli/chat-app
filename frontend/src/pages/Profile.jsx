import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  console.log("hello world");
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Update your profile information</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
