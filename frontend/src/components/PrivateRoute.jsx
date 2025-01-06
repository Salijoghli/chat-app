import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Loader } from "lucide-react";
export const PrivateRoute = () => {
  const { authUser, isCheckingAuth } = useAuthStore();
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return authUser ? <Outlet /> : <Navigate to="/login" replace />;
};
