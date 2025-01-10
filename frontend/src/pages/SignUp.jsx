import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { TextInput } from "../components/TextInput";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { registerUserSchema } from "../../../shared/userValidation";
import { ErrorMessage } from "../components/ErrorMessage";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";
import { RadioButton } from "../components/RadioButton";
import toast from "react-hot-toast";

const defaultFormData = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  gender: "",
};

const Signup = () => {
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors, isSubmitted },
    setFocus,
    watch,
  } = useForm({
    resolver: joiResolver(registerUserSchema),
    defaultValues: defaultFormData,
  });

  const { authUser, signup, isSigningUp, isSigningUpError, setFieldStatus } =
    useAuthStore();

  const navigate = useNavigate();

  // Set focus on the first input field with an error
  useEffect(() => {
    const firstError = Object.keys(errors)[0];
    if (firstError) setFocus(firstError);
  }, [setFocus, errors]);

  // Show error toast if there are errors in the form
  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      toast.error("Whoops! There was an error with your submission.");
    }
  }, [isSubmitted, errors]);

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }

    return () => {
      setFieldStatus("isLoggingInError", false);
    };
  }, [authUser, navigate, setFieldStatus]);

  const isConfirmedPasswordError = isSubmitted && !watch("confirmPassword");

  return (
    <AuthForm mode="signup">
      <form
        onSubmit={onSubmit((data) => {
          signup(data);
        })}
        className="space-y-6"
      >
        <TextInput
          name="email"
          type="email"
          {...register("email")}
          error={!!errors.email || isSigningUpError}
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}

        <TextInput
          name="username"
          {...register("username")}
          error={!!errors.username || isSigningUpError}
        />
        {errors.username && <ErrorMessage message={errors.username.message} />}

        <TextInput
          name="password"
          type="password"
          {...register("password")}
          error={!!errors.password || isSigningUpError}
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}

        <TextInput
          name="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword || isConfirmedPasswordError}
        />

        {
          // Show error messages only after form submission, in case the user hasn't entered the confirm password we show a different error message
          isConfirmedPasswordError ? (
            <p className="text-error text-sm mt-1 px-2">
              Password is required.
            </p>
          ) : (
            errors.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword.message} />
            )
          )
        }

        <RadioButton name="gender" {...register("gender")} />
        {errors.gender && <ErrorMessage message={errors.gender.message} />}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSigningUp}
        >
          {isSigningUp ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Loading...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
      <div className="text-center">
        <p className="text-base-content/60">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Sign in
          </Link>
        </p>
      </div>
    </AuthForm>
  );
};

export default Signup;
