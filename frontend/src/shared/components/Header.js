import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../features/auth/authActions";
import { setGroup } from "../../store/actions/friendsActions";
import "../../styles/header.css";
import Avatar from "./Avatar";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGroup());
  }, [dispatch]);

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
                <NavLink to="/user-profile">Profile</NavLink>
                <NavLink to="/dashboard">Messages</NavLink>
                <NavLink to="/jobs">Jobs</NavLink>
                <Avatar />
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
