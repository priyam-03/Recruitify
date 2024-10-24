import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateProfile, profile } from "../features/auth/authActions";
import { updateProfileReset } from "../features/auth/authSlice";
import Error from "../shared/components/Error";
import Spinner from "../shared/components/Spinner";
import styles from "../styles/UpdateProfile.module.css";

const UpdateProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error, isUpdated, userInfo } = useSelector(
    (state) => state.auth
  );
  
  const [customError, setCustomError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    defaultValues: {
      name: userInfo?.user?.name || "",
      email: userInfo?.user?.email || "",
      file: null
    }
  });

  const validateEmail = (value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return true;
  };

  const validateImage = (file) => {
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        return "Please upload a valid image file (JPEG, PNG, or GIF)";
      }
      if (file.size > 5 * 1024 * 1024) {
        return "File size should be less than 5MB";
      }
    }
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validationResult = validateImage(file);
      if (validationResult === true) {
        setValue('file', file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setCustomError(validationResult);
      }
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email.toLowerCase());
    if (data.file) {
      formData.append("file", data.file);
    }

    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (userInfo?.user) {
      setValue("name", userInfo.user.name);
      setValue("email", userInfo.user.email);
    }
    
    if (error) {
      setCustomError(error);
    }
    
    if (isUpdated) {
      dispatch(profile());
      navigate("/user-profile");
      dispatch(updateProfileReset());
    }
  }, [error, isUpdated, userInfo, dispatch, navigate, setValue]);

  return (
    <div className={styles.updateProfileBody}>
      <div className={styles.updateProfileContainer}>
        <form className={styles.updateProfileForm} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={styles.formHeading}>Update Profile</h1>
          
          {(error || customError) && (
            <div className={styles.error}>
              {error || customError}
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              className={styles.formInput}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long"
                }
              })}
            />
            {errors.name && (
              <div className={styles.error}>{errors.name.message}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className={styles.formInput}
              {...register("email", {
                required: "Email is required",
                validate: validateEmail
              })}
            />
            {errors.email && (
              <div className={styles.error}>{errors.email.message}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="file">
              Profile Photo
            </label>
            <input
              id="file"
              type="file"
              accept="image/*"
              className={styles.fileInput}
              onChange={handleFileChange}
            />
            {previewImage && (
              <div className="mt-4 flex justify-center">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}
            {errors.file && (
              <div className={styles.error}>{errors.file.message}</div>
            )}
          </div>

          <button
            type="submit"
            className={styles.updateButton}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileScreen;