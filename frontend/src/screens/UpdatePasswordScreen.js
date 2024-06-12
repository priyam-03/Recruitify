import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../shared/components/Error";
import Spinner from "../shared/components/Spinner";
import { useForm } from "react-hook-form";
import { passwordUpdate, profile } from "../features/auth/authActions";
import { updateProfileReset } from "../features/auth/authSlice";
const UpdatePasswordScreen = () => {
  const [customError, setCustomError] = useState(null);
  const { loading, error, isUpdated } = useSelector((state) => state.auth);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitForm = () => {
    var formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    const formDataObj = {};
    formData.forEach((value, key) => (formDataObj[key] = value));
    console.log(formDataObj.file);
    dispatch(passwordUpdate(formDataObj));
  };
  useEffect(() => {
    if (error) {
      alert(error);
    }
    if (isUpdated) {
      dispatch(profile());
      navigate("/user-profile");
      dispatch(updateProfileReset());
    }
  }, [error, isUpdated]);
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>}
      <div className="form-group">
        <label htmlFor="oldPassword">Old Password</label>
        <input
          type="text"
          className="form-input"
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="newPassword">New Password</label>
        <input
          type="text"
          className="form-input"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">confirm Password</label>
        <input
          id="confirmPassword"
          type="text"
          className="form-input"
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="button" disabled={loading}>
        {loading ? <Spinner /> : "Update Password"}
      </button>
      {errors.files && <div className="error">{errors.files.message}</div>}
    </form>
  );
};

export default UpdatePasswordScreen;
