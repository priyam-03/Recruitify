import { useState, useEffect } from "react";
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
import JobApplicationPage from "./screens/JobApplications";
import FormById from "./Jobs/FormById";
import Logo from "./shared/components/logo";
import JobsAppliedByMe from "./screens/JobsAppliedByMe";
import ShortlistedApplicants from "./Jobs/ShortlistedApplicants";
import Interview from "./Interview/Interview";
function App() {
  const [showLogo, setShowLogo] = useState(false);
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowLogo(true);
      const timer = setTimeout(() => {
        setShowLogo(false);
        localStorage.setItem("hasVisited", "true");
      }, 2000);

      return () => clearTimeout(timer);
    }

    // Event handler for clearing localStorage on page unload
    const handleBeforeUnload = () => {
      localStorage.removeItem("hasVisited");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [showLogo]);

  return (
    <>
      <Router>
        {showLogo && (
          <Logo
            logoSrc="/large-logo-color.png"
            height={"100vh"}
            width={"100vw"}
            applyAnimation={true}
            preserveAspectRatio="xMidYMid meet"
          />
        )}
        {!showLogo && (
          <>
            <Header />
            <main className="container content">
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route
                  path="/resetpassword/:token"
                  element={<ResetPassword />}
                />
                <Route element={<ProtectedRoute />}>
                  <Route path="/user-profile" element={<ProfileScreen />} />
                  <Route
                    path="/updatePassword"
                    element={<UpdatePasswordScreen />}
                  />
                  <Route
                    path="/updateProfile"
                    element={<UpdateProfileScreen />}
                  />
                  <Route path="/Jobs" element={<JobApplicationPage />} />
                  <Route path="/chat" element={<Dashboard />} />
                  <Route path="/cluster" element={<Cluster />} />
                  <Route path="/group" element={<Group />} />
                  <Route path="/Jobs/:formId" element={<FormById />} />
                  <Route
                    path="/jobs-applied-by-me"
                    element={<JobsAppliedByMe />}
                  />
                  <Route
                    path="/shortlisted-applicants/:formId/:noOfApplicants"
                    element={<ShortlistedApplicants />}
                  />
                  <Route path="/interview" element={<Interview />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </>
        )}
      </Router>

      <AlertNotification />
    </>
  );
}

export default App;
