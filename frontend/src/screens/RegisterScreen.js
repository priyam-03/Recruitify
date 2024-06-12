import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../shared/components/Error";
import Spinner from "../shared/components/Spinner";
import { registerUser } from "../features/auth/authActions";
import "../styles/register.css";

const RegisterScreen = () => {
  const [customError, setCustomError] = useState(null);
  const [singleFile, setSingleFile] = useState("");
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userInfo) navigate("/user-profile");
  }, [navigate, userInfo]);

  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };

  const submitForm = (data) => {
    if (data.password !== data.confirmPassword) {
      setCustomError("Password mismatch");
      return;
    }
    data.email = data.email.toLowerCase();

    var formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("file", singleFile);

    const formDataObj = {};
    formData.forEach((value, key) => (formDataObj[key] = value));

    dispatch(registerUser(formDataObj));
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit(submitForm)} className="register-form">
        {error && <Error>{error}</Error>}
        {customError && <Error>{customError}</Error>}
        <div className="form-group">
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            className="form-input"
            {...register("name")}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-input"
            {...register("email")}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-input"
            {...register("password")}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-input"
            {...register("confirmPassword")}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fileupload">Profile Photo</label>
          <input
            id="fileupload"
            type="file"
            className="form-input"
            onChange={(e) => SingleFileChange(e)}
            required
          />
        </div>
        <button type="submit" className="register-button" disabled={loading}>
          {loading ? <Spinner /> : "Register"}
        </button>
        {errors.files && <div className="error">{errors.files.message}</div>}
      </form>
    </div>
  );
};

export default RegisterScreen;
