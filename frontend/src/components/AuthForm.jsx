import { MessageSquare } from "lucide-react";
import { AuthImage } from "../components/AuthImage";

export const AuthForm = ({ children }) => {
  return (
    <div className="mt-14 h-screen grid lg:grid-cols-2 align-center justify-center">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 ">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-1 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {children}
        </div>
      </div>
      <AuthImage
        title={"Welcome"}
        subtitle={"Connect and stay in touch with your loved ones."}
      />
    </div>
  );
};
