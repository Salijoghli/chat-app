import { AuthForm } from "../components/AuthForm";
import { Link } from "react-router-dom";
import { TextInput } from "../components/TextInput";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginUserSchema } from "../../../shared/userValidation";
import { ErrorMessage } from "../components/ErrorMessage";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const defaultFormData = {
  username: "",
  password: "",
};

const Login = () => {
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: joiResolver(loginUserSchema),
    defaultValues: defaultFormData,
  });

  console.log(errors);

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = onSubmit((data) => {
    login(data);
  });

  // Show error toast if there are errors in the form
  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      toast.error("Whoops! There was an error with your submission");
    }
  }, [isSubmitted, errors]);

  return (
    <AuthForm>
      <form onSubmit={handleSubmit} className="space-y-3">
        <TextInput
          name="username"
          {...register("username")}
          error={!!errors.username}
        />
        {errors.username && <ErrorMessage message={errors.username.message} />}

        <TextInput
          name="password"
          type="password"
          {...register("password")}
          error={!!errors.password}
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
      <div className="text-center">
        <p className="text-base-content/60">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="link link-primary">
            Create account
          </Link>
        </p>
      </div>
    </AuthForm>
  );
};

export default Login;
