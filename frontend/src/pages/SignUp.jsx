import { Link } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { TextInput } from "../components/TextInput";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { registerUserSchema } from "../../../shared/userValidation";
import { ErrorMessage } from "../components/ErrorMessage";
import { useEffect } from "react";

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
    setFocus,
    watch,
  } = useForm({
    resolver: joiResolver(registerUserSchema),
    defaultValues: defaultFormData,
  });

  const handleSubmit = onSubmit((data) => {
    console.log(data);
  });

  // Set focus on the first input field with an error
  useEffect(() => {
    const firstError = Object.keys(errors)[0];
    if (firstError) setFocus(firstError);
  }, [setFocus, errors]);

  const isConfirmedPasswordError = isSubmitted && !watch("confirmPassword");

  return (
    <AuthForm>
      <h1 className="text-3xl font-semibold text-center ">
        SignUp <span className="text-blue-500"> Chat App</span>
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col justify-center ">
        <TextInput
          name="fullname"
          {...register("fullname")}
          error={!!errors.fullname}
        />
        {errors.fullname && <ErrorMessage message={errors.fullname.message} />}

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
        {errors.gender && <ErrorMessage message={errors.gender.message} />}

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
