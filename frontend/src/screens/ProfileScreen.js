import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout, profile } from "../features/auth/authActions";
import "../styles/profile.css";
import Posts from "../User/posts";
import EducationForm from "../User/educations";
import ExperienceForm from "../User/experience";
import SkillForm from "../User/skillsForm";
import LinkForm from "../User/linkForm";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fetchResume, uploadResume } from "../store/slices/profileSlices";

const ProfileScreen = () => {
  const [activeSection, setActiveSection] = useState('education');
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
        const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';
        window.open(`${baseURL}/${resumeUrl}`, '_blank');
      } else {
        alert("No resume available to view.");
      }
    } catch (error) {
      console.error("Error while opening resume:", error);
      alert("An error occurred while fetching your resume.");
    }
  }

  const handleUploadResume = async (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type === 'application/pdf') {
      setSingleFile(selectedFile);

      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await dispatch(uploadResume(formData));

        if (response.meta.requestStatus === 'fulfilled') {
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
      case 'posts':
        return <Posts />;
      case 'education':
        return <EducationForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'skills':
        return <SkillForm />;
      case 'links':
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
            {['posts', 'education', 'experience', 'skills', 'links'].map((section) => (
              <button
                key={section}
                className={`profile-left-column-buttons ${activeSection === section ? 'active' : ''}`}
                onClick={() => handleButtonClick(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          <div className="profile-middle-column">
            <div>{renderContent()}</div>
          </div>

          <div className="profile-right-column">
            <div className="profile-header">
              <h2 className="profile-welcome">Welcome, {userInfo.user?.name}!</h2>
              <img
                className="profile-image"
                src={`http://localhost:4000/${userInfo.user.avatar.filePath}`}
                alt="Profile"
              />
            </div>
            <div className="profile-info">
              <p className="profile-email">Email: {userInfo.user?.email}</p>
            </div>

            <Link to="/updatePassword" className="profile-button update-password">
              Update Password
            </Link>

            <Link to="/updateProfile" className="profile-button update-profile">
              Update Profile
            </Link>

            <button className="profile-button upload-resume" onClick={handleResumeButtonClick}>
              <div className="resume-section">
                <CloudUploadIcon />
                <span>Upload Resume</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleUploadResume}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
              </div>
            </button>

            <button className="profile-button view-resume" onClick={handleViewResume}>
              <div className="resume-section">
                <VisibilityIcon />
                <span>View Resume</span>
              </div>
            </button>

            <button className="profile-button logout" onClick={() => dispatch(logout())}>
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileScreen;
