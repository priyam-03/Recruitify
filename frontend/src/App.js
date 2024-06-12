import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./shared/components/Header";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import ProtectedRoute from "./routing/ProtectedRoute";
import UpdatePasswordScreen from "./screens/UpdatePasswordScreen";
import UpdateProfileScreen from "./screens/UpdateProfileScreen";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import Dashboard from "./Dashboard/Dashboard";
import AlertNotification from "./shared/components/AlertNotification";
import Cluster from "./Cluster/Cluster";
import Group from "./Group/Group";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="container content">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/user-profile" element={<ProfileScreen />} />
              <Route
                path="/updatePassword"
                element={<UpdatePasswordScreen />}
              />
              <Route path="/updateProfile" element={<UpdateProfileScreen />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cluster" element={<Cluster />} />
              <Route path="/group" element={<Group />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </Router>
      <AlertNotification />
    </>
  );
}

export default App;
