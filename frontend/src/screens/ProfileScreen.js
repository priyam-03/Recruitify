import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { profile } from "../features/auth/authActions";
import "../styles/profile.css";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  return (
    <div className="profile-container">
      {userInfo && (
        <>
          <div className="profile-header">
            <h2 className="profile-welcome">Welcome, {userInfo.user?.name}!</h2>
            <img
              className="profile-image"
              src={`http://localhost:4000/${userInfo.user.avatar.filePath}`}
              alt="Profile"
            />
          </div>
          <div className="profile-info">
            <p className="profile-email">Email: {userInfo.user?.email}</p>
          </div>
          <div className="profile-actions">
            <Link
              to="/updatePassword"
              className="profile-button update-password"
            >
              Update Password
            </Link>
            <Link to="/updateProfile" className="profile-button update-profile">
              Update Profile
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileScreen;
