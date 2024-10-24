import React, { useEffect, useState } from "react";
import styles from "../../styles/dashBoard.module.css";
import CreatePost from "../../User/createPost"; // Ensure the path is correct
import { useDispatch, useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../../styles/jobForms.css";
import { useNavigate } from "react-router-dom";
import { fetchAllJobForms } from "../../store/slices/JobSlices";
import AllPost from "./AllPosts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AllJobForms = () => {
  const dispatch = useDispatch();
  const allJobForms = useSelector((state) => state.jobs.allJobForms);
  const isLoading = useSelector((state) => state.jobs.isLoading);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllJobForms());
  }, [dispatch]);

  if (isLoading) {
    return <div className="loading-text">Loading...</div>;
  }

  if (!Array.isArray(allJobForms)) {
    return <div className="error-message">Failed to load job forms.</div>;
  }

  const handleFormById = (formId) => {
    navigate(`/Jobs/${formId}`);
  };

  return (
    <div className="jobform-page">
      <h2 className="job-forms-heading">Find Your Dream Job</h2>
      <div className="jobform-container">
        {allJobForms.length > 0 ? (
          allJobForms.map((jobForm, index) => (
            <div key={index} className="job-form-box">
              <div className="job-role-container">
                <div className="job-role">
                  <WorkIcon fontSize="2rem" />
                  <span className="job-texts">
                    {jobForm.jobRole}
                    {/* adding comment */}
                    {/* {jobForm.requiredSkills &&
                          jobForm.requiredSkills.length > 0 && (
                            <>
                              <span className="job-texts"> | </span>
                              {jobForm.requiredSkills.map((skill, index) => (
                                <span key={index} className="job-skill">
                                  {skill}
                                  {index !== jobForm.requiredSkills.length - 1 && ", "}
                                </span>
                              ))}
                            </>
                          )} */}
                  </span>
                  <MoreVertIcon className="job-form-dropdown" color="white" />
                </div>
              </div>
              <div
                className="job-desc"
                onClick={() => handleFormById(jobForm._id)}
              >
                <div className="avatar-section">
                  <AccountCircleIcon />
                  <span className="owner-name">
                    {jobForm.ownerProfile.name}
                    {jobForm.ownerProfile._id === userInfo.user._id && (
                      <span> (me)</span>
                    )}
                  </span>
                </div>
                <div className="job-company">
                  <BusinessIcon />
                  <span className="job-dtexts">{jobForm.company}</span>
                </div>
                <div className="job-location">
                  <LocationOnIcon />
                  <span className="job-dtexts">{jobForm.jobLocation}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-jobs-available">No more jobs available...</div>
        )}
      </div>
      <div className="job-form-footer">No more jobs...</div>
    </div>
  );
};

const DashBoard = () => {
  const [createPostButtonOn, setCreatePostButtonOn] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleShowCreatePost = () => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
    setShowModal(!showModal);
  };

  return (
    <div className={styles.HomePageContent}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/${userInfo.user.avatar.filePath}`}
            alt="Profile"
            className={styles.profilePic}
          />
          <button
            className={styles.createPostBtn}
            onClick={handleShowCreatePost}
          >
            Create Post
          </button>
        </div>

        <div className={styles.middleColumn}>
          <AllPost />
        </div>

        <div className={styles.rightColumn}>
          <AllJobForms />
        </div>
        <CreatePost
          showModal={showModal}
          handleShowCreatePost={handleShowCreatePost}
        />
      </div>
    </div>
  );
};

export default DashBoard;
