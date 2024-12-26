import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  applyForJob,
  fetchJobById,
  fetchShortlistedApplicants,
} from "../store/slices/JobSlices";
import WorkIcon from "@mui/icons-material/Work";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "../styles/formById.module.css";
import { useNavigate } from "react-router-dom";
import ShortlistModal from "../shared/components/shortlistModal.js";

const FormById = () => {
  const { formId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const jobFormTemp = useSelector((state) => state.jobs.jobFormById);
  const loading = useSelector((state) => state.jobs.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const skillsContainerRef = useRef(null);

  useEffect(() => {
    if (formId) {
      dispatch(fetchJobById(formId));
    }
  }, [dispatch, formId]);

  const jobForm = useMemo(() => jobFormTemp, [jobFormTemp]);

  useEffect(() => {
    // Set applicants when jobForm is fetched
    if (jobForm && jobForm.applicantProfiles) {
      setApplicants(jobForm.applicantProfiles);
    }
  }, [jobForm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!jobForm._id) {
    return <div>No job form data available.</div>;
  }

  const avatarUrl = ``;

  const scrollSkills = (direction) => {
    if (skillsContainerRef.current) {
      const scrollAmount = direction === "left" ? -100 : 100;
      skillsContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const shortlistApplication = (numApplicants) => {
    if (numApplicants > 0) {
      dispatch(
        fetchShortlistedApplicants({ formId, noOfApplicants: numApplicants })
      ).then(() => {
        navigate(`/shortlisted-applicants/${formId}/${numApplicants}`);
      });
    } else {
      alert("Please enter a valid number of applicants.");
    }
  };

  const handleApplyForJob = () => {
    dispatch(applyForJob(formId)).then(() => {
      // After applying for the job, update the applicants list
      dispatch(fetchJobById(formId)).then((response) => {
        // Assuming fetchJobById updates the jobForm in Redux store, update the local state
        setApplicants(response.payload.applicantProfiles);
      });
    });
  };

  return (
    <div className={styles.formbyidPage} id="job-container">
      <div className={styles.avatarSection} id="job-details">
        <img
          className={styles.avatar}
          src={avatarUrl ? avatarUrl : "/ppic.jpg"}
          alt={jobForm.ownerProfile.name}
        />
        <span className={styles.ownerName}>{jobForm.ownerProfile.name}</span>

        <div className={styles.ownerEmail}>
          Email:
          <span className={styles.ownerEmailText}>
            {" "}
            {jobForm.ownerProfile.email}
          </span>
        </div>
      </div>
      <div className={styles.jobDescSection}>
        <div className={styles.jobRole}>
          <span className={styles.jobTexts}>
            <WorkIcon /> {jobForm.jobRole}{" "}
            {jobForm.company && <text>({jobForm.company})</text>}
          </span>

          {jobForm.ownerProfile._id === userInfo.user._id && (
            <div className={styles.interviewSection}>
              <button onClick={() => navigate("/interview")}>
                Take Interview
              </button>
            </div>
          )}

          {jobForm.ownerProfile._id !== userInfo.user._id && (
            <button className={styles.applyButton} onClick={handleApplyForJob}>
              Apply
            </button>
          )}
        </div>

        <div className={styles.jobBody}>
          <div className={styles.jobMislanious}>
            <ul>
              <li className={styles.jobTexts}>
                <span>
                  {jobForm.jobLocation}{" "}
                  {jobForm.jobLocationType && (
                    <text>({jobForm.jobLocationType})</text>
                  )}
                </span>
              </li>
              {jobForm.totalDurations && (
                <li className={styles.jobTexts}>
                  Total Duration: {jobForm.totalDuration}{" "}
                  {jobForm.totalDuration}
                </li>
              )}
              {jobForm.workingHours && (
                <li className={styles.jobTexts}>
                  Working Hours: {jobForm.workingHours.value}{" "}
                  {jobForm.workingHours.mode}
                </li>
              )}
              {jobForm.salary && (
                <li className={styles.jobTexts}>
                  Salary: {jobForm.salary.value} {jobForm.salary.currency}{" "}
                  {jobForm.salary.mode}
                </li>
              )}
            </ul>
          </div>

          {jobForm.requiredSkills.length > 0 && (
            <div className={styles.jobSkills}>
              <ArrowLeftIcon
                className={styles.arrowLeft}
                onClick={() => scrollSkills("left")}
              />
              <div className={styles.skillsContainer} ref={skillsContainerRef}>
                {jobForm.requiredSkills.map((skill, index) => (
                  <div key={index} className={styles.jobSkill}>
                    {skill.skill}
                  </div>
                ))}
              </div>
              <ArrowRightIcon
                className={styles.arrowRight}
                onClick={() => scrollSkills("right")}
              />
            </div>
          )}

          <div className={styles.jobDescription} id="job-description">
            <text className={styles.jobDescHeading}>Job Description: </text>
            <textarea className={styles.jobDescTexts} readOnly>
              {jobForm.jobDescription}
            </textarea>
          </div>
        </div>
      </div>

      {/* <div className={styles.applicantsSection}>
        <h2>Applicants</h2>
        {applicants.length > 0 ? (
          applicants.map((applicant, index) => (
            <div key={index} className={styles.applicantAvatarSection}>
              <img
                className={styles.applicantAvatar}
                src={avatarUrl}
                alt={applicant.userId.name}
              />
              <span className={styles.applicantOwnerName}>
                {applicant.userId.name}
              </span>
              <MoreVertIcon className={styles.jobFormDropdown} />
            </div>
          ))
        ) : (
          <div>No application for the Job yet</div>
        )} */}

      <div className={styles.applicantsSection}>
        <h2>Applicants</h2>
        <div className={styles.upperscrollable}>
          {applicants.length > 0 ? (
            applicants.map((applicant, index) => (
              <div key={index} className={styles.applicantAvatarSection}>
                <img
                  className={styles.applicantAvatar}
                  src={applicant.avatarUrl}
                  alt={applicant.userId.name}
                />
                <span className={styles.applicantOwnerName}>
                  {applicant.userId.name}
                </span>
                <MoreVertIcon className={styles.jobFormDropdown} />
              </div>
            ))
          ) : (
            <div className={styles.noappl}>No application for the Job yet</div>
          )}
        </div>
        <div className={styles.lowerfixed}>
          {jobForm.ownerProfile._id === userInfo.user._id && (
            <div className={styles.shortlistSection}>
              {/* <input
            type="number"
            id="noOfApplicants"
            value={noOfApplicants}
            onChange={(e) => setNoOfApplicants(e.target.value)}
            placeholder="Enter number of applicants to shortlist"
          /> */}

              <button onClick={() => setIsModalOpen(true)} id="change-btn">
                Shortlist
              </button>
            </div>
          )}
          {jobForm.ownerProfile._id === userInfo.user._id && (
            <ShortlistModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={shortlistApplication}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FormById;
