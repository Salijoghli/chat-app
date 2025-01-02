import { Link } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { TextInput } from "../components/TextInput";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { registerUserSchema } from "../../../shared/userValidation";

const defaultFormData = {
  fullname: "",
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
    getValues,
  } = useForm({
    resolver: joiResolver(registerUserSchema),
    defaultValues: defaultFormData,
  });

  const handleSubmit = onSubmit((data) => {
    console.log(data);
  });

  return (
    <AuthForm>
      <h1 className="text-3xl font-semibold text-center ">
        SignUp <span className="text-blue-500"> Chat App</span>
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col justify-center ">
        <TextInput name="fullname" {...register("fullname")} />
        {errors.fullname && (
          <p className="text-error text-sm mt-1">{errors.fullname.message}</p>
        )}
        <TextInput name="username" {...register("username")} />
        {errors.username && (
          <p className="text-error text-sm mt-1">{errors.username.message}</p>
        )}
        <TextInput name="password" type="password" {...register("password")} />
        {errors.password && (
          <p className="text-error text-sm mt-1">{errors.password.message}</p>
        )}
        <TextInput
          name="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />

        {
          // Show error messages only after form submission, in case the user hasn't entered the confirm password we show a different error message
          isSubmitted && !getValues("confirmPassword") ? (
            <p className="text-error text-sm mt-1">Password is required</p>
          ) : (
            errors.confirmPassword && (
              <p className="text-error text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )
          )
        }

        {/* Gender */}
        <div className="flex items-center justify-center gap-8">
          <label className="label cursor-pointer ">
            <span className="label-text">Male </span>
            <input
              type="radio"
              className="radio radio-primary mx-5"
              name="gender"
              value="male"
              defaultChecked
              {...register("gender")}
            />
          </label>

          <label className="label cursor-pointer">
            <span className="label-text">Female </span>
            <input
              type="radio"
              className="radio radio-error mx-5"
              name="gender"
              value="female"
              {...register("gender")}
            />
          </label>
        </div>
        {errors.gender && (
          <p className="text-error text-sm mt-1">{errors.gender.message}</p>
        )}

        <Link
          className="text-sm hover:underline hover:text-blue-600 inline-block text-center my-2"
          to="/login"
        >
          Already have an account?{" "}
        </Link>

        <button className="btn btn-block btn-sm mt-2">Sign Up</button>
      </form>
    </AuthForm>
  );
};

export default Signup;
