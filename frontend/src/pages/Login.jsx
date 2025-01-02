import { AuthForm } from "../components/AuthForm";
import { Link } from "react-router-dom";
import { TextInput } from "../components/TextInput";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginUserSchema } from "../../../shared/userValidation";
import { ErrorMessage } from "../components/ErrorMessage";

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

  const handleSubmit = onSubmit((data) => {
    console.log(data);
  });

  return (
    <AuthForm>
      <h1 className="text-3xl font-semibold text-center ">
        Login
        <span className="text-blue-500"> Chat App</span>
      </h1>

      <form onSubmit={handleSubmit}>
        <TextInput name="username" {...register("username")} />
        {errors.username && <ErrorMessage message={errors.username.message} />}

        <TextInput name="password" type="password" {...register("password")} />
        {errors.password && <ErrorMessage message={errors.password.message} />}
        <Link
          className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          to="/signup"
        >
          Don&apos;t have an account?{" "}
        </Link>
        <button className="btn btn-block btn-sm mt-2">Login</button>
      </form>
    </AuthForm>
  );
};

export default Login;
