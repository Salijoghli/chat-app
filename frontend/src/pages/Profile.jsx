import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { Camera } from "lucide-react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { updateUserSchema } from "../../../shared/userValidation.js";
import { TextInput } from "../components/TextInput";
import { ErrorMessage } from "../components/ErrorMessage";

const Profile = () => {
  const { authUser, isUpdatingProfile, isUpdatingProfileError, updateProfile } =
    useAuthStore();
  const [profile, setProfile] = useState(authUser);

  console.log(profile);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(updateUserSchema),
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePicture: reader.result,
      }));
  };

  const handleFormSubmit = handleSubmit((data) => {
    updateProfile({ ...profile, ...data });
  });

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Update your profile information</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={profile.profilePicture || "/default-avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200"
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <TextInput
              name="email"
              type="email"
              {...register("email")}
              value={profile.email}
              error={!!errors.email || isUpdatingProfileError}
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}

            <TextInput
              name="username"
              {...register("username")}
              value={profile.username}
              error={!!errors.username || isUpdatingProfileError}
            />
            {errors.username && (
              <ErrorMessage message={errors.username.message} />
            )}

            <TextInput
              name="oldPassword"
              type="password"
              {...register("oldPassword")}
              error={!!errors.oldPassword || isUpdatingProfileError}
            />
            {errors.oldPassword && (
              <ErrorMessage message={errors.oldPassword.message} />
            )}

            <TextInput
              name="newPassword"
              type="password"
              {...register("newPassword")}
              error={!!errors.newPassword || isUpdatingProfileError}
            />
            {errors.newPassword && (
              <ErrorMessage message={errors.newPassword.message} />
            )}

            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="w-full py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-focus transition-all duration-200"
            >
              {isUpdatingProfile ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
