import { AuthForm } from "../components/AuthForm";
import { Link } from "react-router-dom";
import { TextInput } from "../components/TextInput";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginUserSchema } from "../../../shared/userValidation";
import { ErrorMessage } from "../components/ErrorMessage";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";

const defaultFormData = {
  username: "",
  password: "",
};

const Login = () => {
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginUserSchema),
    defaultValues: defaultFormData,
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = onSubmit((data) => {
    login(data);
  });

  return (
    <AuthForm>
      <form onSubmit={handleSubmit} className="space-y-6">
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
