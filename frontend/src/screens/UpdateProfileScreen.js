import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../shared/components/Error";
import Spinner from "../shared/components/Spinner";
import { updateProfile, profile } from "../features/auth/authActions";
import { updateProfileReset } from "../features/auth/authSlice";
const UpdateProfileScreen = () => {
  const [customError, setCustomError] = useState(null);
  const [singleFile, setSingleFile] = useState("");
  const { loading, error, isUpdated, userInfo } = useSelector(
    (state) => state.auth
  );
  const [name, setName] = useState(userInfo.user.name);
  const [email, setEmail] = useState(userInfo.user.email);

  console.log(isUpdated);
  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = () => {
    // check if passwords match
    // transform email string to lowercase to avoid case sensitivity issues in login

    var formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);

    formData.append("file", singleFile);

    const formDataObj = {};
    formData.forEach((value, key) => (formDataObj[key] = value));
    console.log(formDataObj.file);
    dispatch(updateProfile(formDataObj));
  };
  useEffect(() => {
    if (userInfo.user) {
      setName(userInfo.user.name);
      setEmail(userInfo.user.email);
    }
    if (error) {
      alert(error);
    }
    if (isUpdated) {
      console.log("why");
      dispatch(profile());
      navigate("/user-profile");
      dispatch(updateProfileReset());
    }
  }, [error, isUpdated, userInfo.user]);
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>}
      <div className="form-group">
        <label htmlFor="name">First Name</label>
        <input
          type="text"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          placeholder="update"
        />
      </div>
      <button type="submit" className="button" disabled={loading}>
        {loading ? <Spinner /> : "Update Profile"}
      </button>
      {errors.files && <div className="error">{errors.files.message}</div>}
    </form>
  );
};

export default UpdateProfileScreen;
