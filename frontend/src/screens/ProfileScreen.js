import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/profile.css";
import EducationForm from "../User/educations";
import ExperienceForm from "../User/experience";
import SkillForm from "../User/skillsForm";
import LinkForm from "../User/linkForm";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { fetchResume, uploadResume } from "../store/slices/profileSlices";
import MyPost from "../User/myPosts";

const ProfileScreen = () => {
  const [activeSection, setActiveSection] = useState("posts");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [singleFile, setSingleFile] = useState("");
  const fileInputRef = useRef(null);
  const resumeUrl = useSelector((state) => state.profile.resume);

  useEffect(() => {
    dispatch(fetchResume());
  }, [dispatch]);

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  const handleViewResume = async () => {
    try {
      if (resumeUrl) {
        window.open(resumeUrl, "_blank");
      } else {
        alert("No resume available to view.");
      }
    } catch (error) {
      console.error("Error while opening resume:", error);
      alert("An error occurred while fetching your resume.");
    }
  };

  const handleUploadResume = async (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      setSingleFile(selectedFile);

      try {
        const formData = new FormData();
        formData.append("resume", selectedFile);

        const response = await dispatch(uploadResume(formData));

        if (response.meta.requestStatus === "fulfilled") {
          alert("Your resume has been uploaded successfully!");
        } else {
          alert(`Failed to upload your resume: ${selectedFile.name}`);
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("An error occurred while uploading your resume.");
      }
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleResumeButtonClick = () => {
    fileInputRef.current.click();
  };

  const renderContent = () => {
    switch (activeSection) {
      case "posts":
        return <MyPost />;
      case "education":
        return <EducationForm />;
      case "experience":
        return <ExperienceForm />;
      case "skills":
        return <SkillForm />;
      case "links":
        return <LinkForm />;
      default:
        return <div>Posts content here...</div>;
    }
  };

  return (
    <div className="profile-container">
      {userInfo && (
        <>
          <div className="profile-left-column">
            {["posts", "education", "experience", "skills", "links"].map(
              (section) => (
                <button
                  key={section}
                  className={`profile-left-column-buttons ${
                    activeSection === section ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              )
            )}
          </div>

          <div className="profile-middle-column">
            <div>{renderContent()}</div>
          </div>

          <div className="profile-right-column">
            <div className="profile-header">
              <h2 className="profile-welcome">
                Welcome, {userInfo.user?.name}!
              </h2>
              <img
                className="profile-image"
                src={
                  userInfo.user.avatar.filePath === ""
                    ? "https://plus.unsplash.com/premium_vector-1721131162397-943dc390c744?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    : `${process.env.REACT_APP_BACKEND_URL}/${userInfo.user.avatar.filePath}`
                }
                alt="Profile"
                onError={(e) => {
                  // Handle image load failure by switching to fallback avatar or user initials
                  e.target.onerror = null; // Prevent infinite loop if fallback fails
                  e.target.src = "/ppic.jpg"; // Set fallback avatar image
                }}
              />
            </div>
            <div className="profile-info">
              <p className="profile-email">Email: {userInfo.user?.email}</p>
            </div>

            <Link
              to="/updatePassword"
              className="profile-button update-password"
            >
              Update Password
            </Link>

            <Link to="/updateProfile" className="profile-button update-profile">
              Update Profile
            </Link>

            <button
              className="profile-button upload-resume"
              onClick={handleResumeButtonClick}
            >
              <div className="resume-section">
                <CloudUploadIcon />
                <span>Upload Resume</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleUploadResume}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
              </div>
            </button>

            <button
              className="profile-button view-resume"
              onClick={handleViewResume}
            >
              <div className="resume-section">
                <VisibilityIcon />
                <span>View Resume</span>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileScreen;
