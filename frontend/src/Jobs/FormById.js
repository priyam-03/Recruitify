import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { applyForJob, fetchJobById } from "../store/slices/JobSlices";
import WorkIcon from "@mui/icons-material/Work";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "../styles/formById.module.css";
import { useNavigate } from "react-router-dom";
import { fetchShortlistedApplicants } from "../store/slices/JobSlices";
import Error from "../shared/components/Error";
const FormById = () => {
  const { formId } = useParams();
  const [noOfApplicants, setNoOfApplicants] = useState(0);
  const jobFormTemp = useSelector((state) => state.jobs.jobFormById);
  const loading = useSelector((state) => state.jobs.isLoading);
  const errorMessage = useSelector((state) => state.jobs.errorMessage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const skillsContainerRef = useRef(null);

  useEffect(() => {
    if (formId) {
      dispatch(fetchJobById(formId));
    }
  }, [dispatch, formId]);

  const jobForm = useMemo(() => jobFormTemp, [jobFormTemp]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!jobForm._id) {
    return <div>No job form data available.</div>;
  }

  // const avatarUrl = `http://localhost:4000/${jobForm.ownerProfile.avatar.filePath.replace(
  //   /\\/g,
  //   "/"
  // )}`;
  const avatarUrl = `https://www.flaticon.com/free-icon/user-picture_21104`;
  const getApplicantUrl = (path) =>
    `http://localhost:4000/${path.replace(/\\/g, "/")}`;

  const scrollSkills = (direction) => {
    if (skillsContainerRef.current) {
      const scrollAmount = direction === "left" ? -100 : 100;
      skillsContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const shortlistApplication = () => {
    if (noOfApplicants > 0) {
      // Send formId and noOfApplicants as query parameters
      console.log(formId, noOfApplicants);
      dispatch(fetchShortlistedApplicants({ formId, noOfApplicants })).then(
        () => {
          navigate(`/shortlisted-applicants/${formId}/${noOfApplicants}`);
        }
      );
    } else {
      alert("Please enter a valid number of applicants.");
    }
  };

  return (
    <div className={styles.formbyidPage}>
      {errorMessage && <Error>{errorMessage}</Error>}
      <div className={styles.avatarSection}>
        <img
          className={styles.avatar}
          src={avatarUrl}
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
          <WorkIcon />
          <span className={styles.jobTexts}>
            {jobForm.jobRole}{" "}
            {jobForm.company && <text>({jobForm.company})</text>}
          </span>
        </div>
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
                Total Duration: {jobForm.totalDuration} {jobForm.totalDuration}
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
                  {skill}
                </div>
              ))}
            </div>
            <ArrowRightIcon
              className={styles.arrowRight}
              onClick={() => scrollSkills("right")}
            />
          </div>
        )}
        <div className={styles.jobDescription}>
          <text className={styles.jobDescHeading}>Job Description: </text>
          <textarea className={styles.jobDescTexts} readOnly>
            {jobForm.jobDescription}
          </textarea>
        </div>
        <button
          className={styles.applyButton}
          onClick={() => dispatch(applyForJob(formId))}
        >
          Apply
        </button>
      </div>
      <div className={styles.applicantsSection}>
        <h2>Applicants</h2>
        {jobForm.applicantProfiles.length > 0 ? (
          jobForm.applicantProfiles.map((applicant, index) => (
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
        )}
        <input
          type="number"
          id="noOfApplicants"
          value={noOfApplicants}
          onChange={(e) => setNoOfApplicants(e.target.value)}
        />
        <button onClick={shortlistApplication}>Shortlist</button>
      </div>
    </div>
  );
};

export default FormById;
