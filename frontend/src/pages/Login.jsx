import { AuthForm } from "../components/AuthForm";
import { Link } from "react-router-dom";
import { TextInput } from "../components/TextInput";
import { useState } from "react";

const defaultFormData = {
  username: "",
  password: "",
};

const Login = () => {
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
        Login
        <span className="text-blue-500"> Chat App</span>
      </h1>

      <form onSubmit={handleSubmit}>
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
