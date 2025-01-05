import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import SettingsPage from "./pages/SettingsPage";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { Navbar } from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  // const { user, checkingStatus } = useAuthUser();

  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/settings" element={<PrivateRoute />}>
          <Route index element={<SettingsPage />} />
        </Route>

        <Route path="/profile" element={<PrivateRoute />}>
          <Route index element={<Profile />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
