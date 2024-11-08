import React from "react";
// import "./HomeScreen.css"; // Import the CSS file for styling
import "../styles/HomeScreen.css";
import { useSelector } from "react-redux";
import HomePage from "../shared/components/homePage";
import DashBoard from "../shared/components/dashboard";
const HomeScreen = () => {
  const { userInfo, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-screen">{userInfo ? <DashBoard /> : <HomePage />}</div>
  );
};

export default HomeScreen;
