import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import SettingsPage from "./pages/SettingsPage";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { Navbar } from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
function App() {
  const { theme } = useThemeStore();
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route element={<Profile />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
