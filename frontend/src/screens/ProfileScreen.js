// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { profile } from "../features/auth/authActions";
// import "../styles/profile.css";

// const ProfileScreen = () => {
//   const dispatch = useDispatch();
//   const { userInfo } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(profile());
//   }, [dispatch]);

//   return (
//     <div className="profile-container">
//       {userInfo && (
//         <>
//           <div className="profile-header">
//             <h2 className="profile-welcome">Welcome, {userInfo.user?.name}!</h2>
//             <img
//               className="profile-image"
//               src={`http://localhost:4000/${userInfo.user.avatar.filePath}`}
//               alt="Profile"
//             />
//           </div>
//           <div className="profile-info">
//             <p className="profile-email">Email: {userInfo.user?.email}</p>
//           </div>
//           <div className="profile-actions">
//             <Link
//               to="/updatePassword"
//               className="profile-button update-password"
//             >
//               Update Password
//             </Link>
//             <Link to="/updateProfile" className="profile-button update-profile">
//               Update Profile
//             </Link>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ProfileScreen;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout, profile } from "../features/auth/authActions";
import "../styles/profile.css";
import Posts from "../User/posts";
import EducationForm from "../User/educations";
import ExperienceForm from "../User/experience";
import SkillForm from "../User/skillsForm";
import LinkForm from "../User/linkForm";

const ProfileScreen = () => {
  const [activeSection, setActiveSection] = useState('education');
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  const handleButtonClick = (section) => {
    setActiveSection(section);
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
            <button
              className={`profile-left-column-buttons ${activeSection === 'posts' ? 'active' : ''}`}
              onClick={() => handleButtonClick('posts')}
            >
              Posts
            </button>
            <button
              className={`profile-left-column-buttons ${activeSection === 'education' ? 'active' : ''}`}
              onClick={() => handleButtonClick('education')}
            >
              Education
            </button>
            <button
              className={`profile-left-column-buttons ${activeSection === 'experience' ? 'active' : ''}`}
              onClick={() => handleButtonClick('experience')}
            >
              Experience
            </button>
            <button
              className={`profile-left-column-buttons ${activeSection === 'skills' ? 'active' : ''}`}
              onClick={() => handleButtonClick('skills')}
            >
              Skills
            </button>
            <button
              className={`profile-left-column-buttons ${activeSection === 'links' ? 'active' : ''}`}
              onClick={() => handleButtonClick('links')}
            >
              Links
            </button>
          </div>

          <div className="profile-middle-column">

            <div>
              {renderContent()}
            </div>
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
            <button className="profile-button logout" onClick={() => dispatch(logout())}>Logout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileScreen;
