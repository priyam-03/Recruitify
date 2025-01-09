import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { fetchMyJobForms, fetchAllJobForms } from "../store/slices/JobSlices";
import { useNavigate } from "react-router-dom";
import "../styles/jobForms.css";
import { fetchAllSkills } from "../store/slices/skillSlices";
const JobForms = ({ type }) => {
  const dispatch = useDispatch();
  const myJobForms = useSelector((state) => state.jobs.myJobForms);
  const allJobForms = useSelector((state) => state.jobs.allJobForms);
  const isLoading = useSelector((state) => state.jobs.isLoading);
  const errorMessage = useSelector((state) => state.jobs.errorMessage);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
 

  useEffect(() => {
    if (type === "my") {
      dispatch(fetchMyJobForms());
    } else if (type === "all") {
      dispatch(fetchAllJobForms());
    }
  }, [dispatch, type]);

  if (isLoading) {
    return <div className="loading-text">Loading...</div>;
  }

  const jobForms = type === "my" ? myJobForms : allJobForms;

  if (!Array.isArray(jobForms)) {
    return <div className="error-message">Failed to load job forms.</div>;
  }

  const handleFormById = (formId) => {
    navigate(`/Jobs/${formId}`);
  };

  return (
    <div className="jobform-page">
      <h2 className="job-forms-heading">Job Application Forms</h2>
      <div className="jobform-container">
        {jobForms.length > 0 ? (
          jobForms.map(
            (jobForm, index) =>
              (type === "all" ||
                (type === "my" &&
                  jobForm.ownerProfile._id === userInfo.user._id)) && (
                <div key={index} className="job-form-box">
                  <div className="job-role-container">
                    <div className="job-role">
                      <WorkIcon fontSize="50px" />
                      <span className="job-texts">
                        {jobForm.jobRole}
                        {jobForm.requiredSkills &&
                          jobForm.requiredSkills.length > 0 && (
                            <>
                              <span className="job-texts"> | </span>
                              {jobForm.requiredSkills.map((skill, index) => (
                                <span key={index} className="job-skill">
                                  {skill.name}
                                  {index !== jobForm.requiredSkills.length - 1 && ", "}
                                </span>
                              ))}
                            </>
                          )}
                      </span>
                      <MoreVertIcon className="job-form-dropdown" color="white" />
                    </div>
                  </div>
                  <div className="job-desc"  onClick={()=>handleFormById(jobForm._id)}>
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

              )
          )
        ) : (
          <div className="no-jobs-available">
            {type === "all" ? "All Jobs..." : "Your Jobs..."}
            No more jobs...
          </div>
        )}
      </div>
      <div className="job-form-footer">No more jobs...</div>
    </div>
  );
};

export default JobForms;
