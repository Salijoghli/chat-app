const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
      <div className="p-6 w-full bg-red-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 text-white">
        <h1 className="text-3xl font-semibold text-center ">
          Login
          <span className="text-blue-500"> Chat App</span>
        </h1>

        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              placeholder="Username"
              className="input input-bordered w-full h-10"
            />
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full h-10"
            />
            <a
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
              href="#"
            >
              Don&apos;t have an account?{" "}
            </a>
            <button className="btn btn-block btn-sm mt-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
