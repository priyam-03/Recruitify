import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { passwordUpdate, profile } from "../features/auth/authActions";
import { updateProfileReset } from "../features/auth/authSlice";
import Error from "../shared/components/Error";
import Spinner from "../shared/components/Spinner";
import styles from "./UpdatePassword.module.css";

const UpdatePasswordScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error, isUpdated } = useSelector((state) => state.auth);
  const [customError, setCustomError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const newPassword = watch("newPassword");

  const validatePasswordMatch = (value) => {
    return value === newPassword || "Passwords do not match";
  };

  const validatePasswordStrength = (value) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isLongEnough = value.length >= 8;

    if (!isLongEnough) return "Password must be at least 8 characters long";
    if (!hasUpperCase) return "Password must contain at least one uppercase letter";
    if (!hasLowerCase) return "Password must contain at least one lowercase letter";
    if (!hasNumbers) return "Password must contain at least one number";
    if (!hasSpecialChar) return "Password must contain at least one special character";

    return true;
  };

  const onSubmit = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setCustomError("Passwords do not match");
      return;
    }
    
    dispatch(passwordUpdate(data));
  };

  useEffect(() => {
    if (error) {
      setCustomError(error);
    }
    
    if (isUpdated) {
      dispatch(profile());
      navigate("/user-profile");
      dispatch(updateProfileReset());
      reset();
    }
  }, [error, isUpdated, dispatch, navigate, reset]);

  return (
    <div className={styles.updatePasswordBody}>
      <div className={styles.updatePasswordContainer}>
        <form className={styles.updatePasswordForm} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={styles.formHeading}>Update Password</h1>
          
          {(error || customError) && (
            <div className={styles.error}>
              {error || customError}
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="oldPassword">
              Current Password
            </label>
            <input
              id="oldPassword"
              type="password"
              className={styles.formInput}
              {...register("oldPassword", {
                required: "Current password is required"
              })}
            />
            {errors.oldPassword && (
              <div className={styles.error}>{errors.oldPassword.message}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="newPassword">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              className={styles.formInput}
              {...register("newPassword", {
                required: "New password is required",
                validate: validatePasswordStrength
              })}
            />
            {errors.newPassword && (
              <div className={styles.error}>{errors.newPassword.message}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={styles.formInput}
              {...register("confirmPassword", {
                required: "Please confirm your new password",
                validate: validatePasswordMatch
              })}
            />
            {errors.confirmPassword && (
              <div className={styles.error}>{errors.confirmPassword.message}</div>
            )}
          </div>

          <button
            type="submit"
            className={styles.updateButton}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordScreen;