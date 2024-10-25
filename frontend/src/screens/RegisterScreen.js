import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../shared/components/Error";
import Spinner from "../shared/components/Spinner";
import { registerUser } from "../features/auth/authActions";
import styles from "../styles/register.module.css";

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

  const handleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };

  const submitForm = (data) => {
    if (data.password !== data.confirmPassword) {
      setCustomError("Password mismatch");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email.toLowerCase());
    formData.append("password", data.password);
    formData.append("file", singleFile);

    const formDataObj = {};
    formData.forEach((value, key) => (formDataObj[key] = value));

    dispatch(registerUser(formDataObj));
  };

  return (
    <div className={styles.registerContainer}>
      <section className={styles.registerWelcome}>
        <div className={styles.registerWelcomeHeader}>
          <h1>Job searching</h1>
          <h1>made easy</h1>
          <h1>and fun.</h1>
        </div>
        <span>Create account in minutes</span>
      </section>
      <form onSubmit={handleSubmit(submitForm)} className={styles.registerForm}>
        <div className={styles.formWrapper}>
          {error && <Error>{error}</Error>}
          {customError && <Error>{customError}</Error>}

          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              First Name
            </label>
            <input
              type="text"
              id="name"
              className={styles.formInput}
              {...register("name", { required: true })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={styles.formInput}
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            {errors.email && (
              <span className={styles.error}>
                Please enter a valid email address
              </span>
            )}
          </div>
          <section className={styles.formGroupPasswords}>
            <div className={styles.formGroup}>
              {errors.password ? (
                <span className={styles.error}>
                  Password must be at least 6 characters long
                </span>
              ) : (
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
              )}

              <input
                type="password"
                id="password"
                className={styles.formInput}
                {...register("password", { required: true, minLength: 6 })}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={styles.formInput}
                {...register("confirmPassword", { required: true })}
              />
            </div>
          </section>

          <div className={styles.formGroup}>
            {errors.file ? (
              <span className={styles.error}>{errors.file.message}</span>
            ) : (
              <label htmlFor="fileupload" className={styles.label}>
                Profile Photo
              </label>
            )}
            <input
              id="fileupload"
              type="file"
              className={styles.formInput}
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>

          <button
            type="submit"
            className={styles.registerButton}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
