import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import Error from "../components/Error";
import Error from "../shared/components/Error";
import Spinner from "../shared/components/Spinner";
import { useForm } from "react-hook-form";
import { passwordReset } from "../features/auth/authActions";
import { useParams } from "react-router-dom";
const ResetPassword = () => {
  const { token } = useParams();
  const [customError, setCustomError] = useState(null);
  const { loading, error, isAuthenticated, userInfo } = useSelector(
    (state) => state.auth
  );
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
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    formData.append("token", token);
    console.log(token);
    const formDataObj = {};
    formData.forEach((value, key) => (formDataObj[key] = value));
    dispatch(passwordReset(formDataObj));
  };
  useEffect(() => {
    if (error) {
      alert(error);
    }
    if (isAuthenticated) {
      navigate("/user-profile");
    }
  }, [error, isAuthenticated]);
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>}
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

export default ResetPassword;
