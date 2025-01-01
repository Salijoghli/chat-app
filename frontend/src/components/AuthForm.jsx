export const AuthForm = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
      <div className="p-6 w-full bg-red-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 text-white">
        {children}
      </div>
    </div>
  );
};
