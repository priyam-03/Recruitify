import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/auth/authActions";
import Error from "../shared/components/Error";
import Spinner from "../shared/components/Spinner";
import "../styles/login.css";

const LoginScreen = () => {
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // Redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate("/user-profile");
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(submitForm)} className="login-form">
        <h2 className="login-heading">Login</h2>
        {error && <Error>{error}</Error>}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-input"
            {...register("email")}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-input"
            {...register("password")}
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? <Spinner /> : "Login"}
        </button>
        <Link to="/forgotpassword" className="forgot-password">
          Forgot Password?
        </Link>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginScreen;
