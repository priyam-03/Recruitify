import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../shared/components/Error";
import Spinner from "../shared/components/Spinner";
import { useForm } from "react-hook-form";
import { passwordForgot } from "../features/auth/authActions";
import { clearmessage } from "../features/auth/authSlice";
const ForgotPasswordScreen = () => {
  const [customError, setCustomError] = useState(null);
  const { loading, error, message } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitForm = () => {
    var formData = new FormData();
    formData.append("email", email);
    const formDataObj = {};
    formData.forEach((value, key) => (formDataObj[key] = value));
    console.log(formDataObj.file);
    dispatch(passwordForgot(formDataObj));
  };
  useEffect(() => {
    if (error) {
      alert(error);
    }
    if (message) {
      alert(message);
      dispatch(clearmessage());
    }
  }, [error, message]);
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>}
      <div className="form-group">
        <label htmlFor="mail">Email</label>
        <input
          type="email"
          className="form-input"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="button" disabled={loading}>
        {loading ? <Spinner /> : "Submit"}
      </button>
      {errors.files && <div className="error">{errors.files.message}</div>}
    </form>
  );
};

export default ForgotPasswordScreen;
