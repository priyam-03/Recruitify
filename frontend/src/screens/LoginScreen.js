import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/auth/authActions";
import Error from "../shared/components/Error";
import Spinner from "../shared/components/Spinner";
import styles from "../styles/Login.module.css";

const LoginScreen = () => {
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  return (
    <div className={styles.loginBody}>
      <section className={styles.registerWelcome}>
        <div className={styles.registerWelcomeHeader}>
          <h1>Welcome back</h1>
          <span>Ready to get back into the job market?</span>
        </div>
      </section>
      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit(submitForm)} className={styles.loginForm}>
          <div className={styles.formGroup}>
            {error ? (
              <Error>{error}</Error>
            ) : (
              <label htmlFor="email" className={styles.formLabel}>
                Email
              </label>
            )}
            <input
              type="email"
              className={styles.formInput}
              {...register("email")}
              required
              id="email"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Password
            </label>
            <input
              type="password"
              className={styles.formInput}
              {...register("password")}
              required
              id="password"
            />
          </div>
          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Login"}
          </button>
          <Link to="/forgotpassword" className={styles.forgotPassword}>
            Forgot Password?
          </Link>
          <p className={styles.signupLink}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
