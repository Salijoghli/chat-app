import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { Camera } from "lucide-react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { updateUserSchema } from "../../../shared/userValidation.js";
import { TextInput } from "../components/TextInput";
import { ErrorMessage } from "../components/ErrorMessage";
import { RadioButton } from "../components/RadioButton";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import classNames from "classnames";
import toast from "react-hot-toast";

const Profile = () => {
  const {
    authUser,
    isUpdatingProfile,
    isUpdatingProfileError,
    updateProfile,
    setFieldStatus,
  } = useAuthStore();

  const buttonClass = classNames(
    "w-full py-2.5 rounded-lg font-semibold transition-all duration-200",
    {
      "bg-primary text-white hover:bg-primary-focus": !isUpdatingProfile,
      "bg-gray-300 text-gray-500 cursor-not-allowed": isUpdatingProfile,
    }
  );

  const [profilePicture, setProfilePicture] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(updateUserSchema),
    defaultValues: {
      email: authUser.email,
      username: authUser.username,
      oldPassword: "",
      newPassword: "",
      gender: authUser.gender,
    },
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds the limit of 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => setProfilePicture(reader.result);
  };

  const handleFormSubmit = handleSubmit((data) => {
    const updatedData = {
      ...data,
    };

    if (profilePicture) updatedData.profilePicture = profilePicture;

    updateProfile(updatedData);
  });

  // Reset the error status when the component unmounts
  useEffect(() => {
    return () => {
      setFieldStatus("isUpdatingProfileError", false);
    };
  }, [setFieldStatus]);

  if (isUpdatingProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Update your profile information</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={profilePicture || authUser.profilePicture}
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
              error={!!errors.email || isUpdatingProfileError}
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}

            <TextInput
              name="username"
              {...register("username")}
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

            <RadioButton
              name="gender"
              {...register("gender")}
              defaultChecked="male"
              options={[
                { label: "Male", value: "male", styleClass: "radio-primary" },
                { label: "Female", value: "female", styleClass: "radio-error" },
              ]}
            />
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className={buttonClass}
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
