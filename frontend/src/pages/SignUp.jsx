import { Link } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { TextInput } from "../components/TextInput";
import { useState } from "react";

const defaultFormData = {
  fullname: "",
  username: "",
  password: "",
  confirmPassword: "",
  gender: "male",
};

const Signup = () => {
  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <AuthForm>
      <h1 className="text-3xl font-semibold text-center ">
        SignUp <span className="text-blue-500"> Chat App</span>
      </h1>

      <form onSubmit={handleSubmit}>
        <TextInput
          name="fullname"
          onChange={handleChange}
          value={formData.fullname}
        />
        <TextInput
          name="username"
          onChange={handleChange}
          value={formData.username}
        />
        <TextInput
          name="password"
          type="password"
          onChange={handleChange}
          value={formData.password}
        />
        <TextInput
          name="confirmPassword"
          type="password"
          onChange={handleChange}
          value={formData.confirmPassword}
        />
        <Link
          className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
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
