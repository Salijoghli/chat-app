import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
export const PrivateRoute = () => {
  const { user, isCheckingAuth } = useAuthStore();
  if (isCheckingAuth) {
    return <div>loading</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};
