import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../features/auth/authActions";
import { setGroup } from "../../store/actions/friendsActions";
import "../../styles/header.css";
import Avatar from "./Avatar";
import UserPopover from "./UserPopover";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(setGroup());
  }, [dispatch]);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  return (
    <header>
      <div className="header-status">
        <NavLink to="/" className="logo-container">
          <img
            src="/small-logo-no-background.png"
            alt="Logo"
            className="logo-image"
          />
          <span
            className="logo-text"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Recruitify
          </span>
        </NavLink>
        <nav className="navigation">
          <NavLink to="/">Home</NavLink>
          <div className="right-buttons">
            {!userInfo ? (
              <>
                <NavLink className="button login" to="/login">
                  Login
                </NavLink>
                <NavLink className="button register" to="/register">
                  Register
                </NavLink>
              </>
            ) : (
              <>
                {/* <NavLink to="/user-profile">Profile</NavLink> */}
                <NavLink to="/chat">Messages</NavLink>
                <NavLink to="/jobs">Jobs</NavLink>
                <div>
                  <Avatar onClick={handleAvatarClick} />
                  <UserPopover
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    user={userInfo.user} 
                    onLogout={handleLogout}
                  />
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
