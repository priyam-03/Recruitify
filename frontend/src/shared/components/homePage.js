import React, { useState } from 'react';
import styles from '../../styles/homePage.module.css';
import CreatePost from '../../User/createPost'; // Ensure the path is correct


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "../../styles/jobForms.css";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { fetchAllJobForms } from '../../store/slices/JobSlices';
import AllPost from './AllPosts';

const AllJobForms = () => {
    const dispatch = useDispatch();
    const allJobForms = useSelector((state) => state.jobs.allJobForms);
    const isLoading = useSelector((state) => state.jobs.isLoading);
    const navigate = useNavigate();

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
            <h2 className="job-forms-heading">Jobs For You</h2>
            <div className="jobform-container">
                {allJobForms.length > 0 ? (
                    allJobForms.map((jobForm, index) => (
                        <div key={index} className="job-form-box">
                            <div className="avatar-section">
                                <img
                                    className="avatar"
                                    src={jobForm.ownerProfile.avatar.filePath}
                                    alt={jobForm.ownerProfile.name}
                                />
                                <span className="owner-name">{jobForm.ownerProfile.name}</span>
                                <MoreVertIcon className="job-form-dropdown" />
                            </div>
                            <div className="job-desc" onClick={() => handleFormById(jobForm._id)}>
                                <div className="job-role">
                                    <WorkIcon />
                                    <span className="job-texts">
                                        {jobForm.jobRole}
                                        {jobForm.requiredSkills && jobForm.requiredSkills.length > 0 && (
                                            <>
                                                <span className="job-texts"> | </span>
                                                {jobForm.requiredSkills.map((skill, index) => (
                                                    <span key={index} className="job-skill">
                                                        {skill}{index !== jobForm.requiredSkills.length - 1 && ", "}
                                                    </span>
                                                ))}
                                            </>
                                        )}
                                    </span>
                                </div>
                                <div className="job-company">
                                    <BusinessIcon />
                                    <span className="job-texts">{jobForm.company}</span>
                                </div>
                                <div className="job-location">
                                    <LocationOnIcon />
                                    <span className="job-texts">{jobForm.jobLocation}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-jobs-available">
                        No more jobs available...
                    </div>
                )}
            </div>
            <div className="job-form-footer">
                No more jobs...
            </div>
        </div>
    );
};


const HomePage = () => {
    const [createPostButtonOn, setCreatePostButtonOn] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const handleShowCreatePost = () => {
        if(!userInfo){
            navigate("/login");
            return;
        }
        
        setShowModal(!showModal);
    };

    const handleOpenModal = () => {
        setCreatePostButtonOn(true);
    };

    const handleCloseModal = () => {
        setCreatePostButtonOn(false);
    };

    return (
        <div className={styles.container}>

            <div className={styles.leftColumn}>
                <img src="profile-pic-url" alt="Profile" className={styles.profilePic} />
                <button className={styles.createPostBtn} onClick={handleShowCreatePost}>Create Post</button>
            </div>

            <div className={styles.middleColumn}>
                <AllPost/>
            </div>

            <div className={styles.rightColumn}>
               <AllJobForms/>
            </div>
            <CreatePost showModal={showModal} handleShowCreatePost={handleShowCreatePost} />
        </div>

    );
};

export default HomePage;
