import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { styled } from "@mui/system"; // MUI styled utility
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../styles/jobForms.css"; // Existing styles

// Define the GraphQL query
const GET_JOB_APPLICATIONS = gql`
  query JobAppliedByMe($status: String) {
    jobAppliedByMe(status: $status) {
      _id
      jobRole
      jobLocation
      company
      applicantProfiles {
        userId {
          _id
          name
        }
        status
        resume
      }
      ownerProfile {
        _id
        name
      }
    }
  }
`;

// Styled Components using MUI's styled
const StyledLabel = styled("label")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "bold",
  marginRight: "10px",
  color: "#333",
}));

const StyledSelect = styled("select")(({ theme }) => ({
  padding: "8px 12px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  outline: "none",
  backgroundColor: "#f9f9f9",
  "&:focus": {
    borderColor: "#007bff",
  },
  "& option": {
    padding: "10px",
  },
}));

const JobsAppliedByMe = () => {
  const [status, setStatus] = useState("");
  const { loading, error, data } = useQuery(GET_JOB_APPLICATIONS, {
    variables: { status },
    skip: status === null,
  });

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  if (loading) {
    return <div className="loading-text">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  const jobApplications = data?.jobAppliedByMe || [];

  return (
    <div className="jobform-page">
      {/* Status Filter */}
      <div className="status-filter">
        <StyledLabel htmlFor="status-filter">Filter by status:</StyledLabel>
        <StyledSelect
          id="status-filter"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="">All</option>
          <option value="applied">Applied</option>
          <option value="shortlisted">Interviewed</option>
          <option value="hired">Hired</option>
          <option value="rejected">Rejected</option>
        </StyledSelect>
      </div>

      {/* Job Applications List */}
      <div className="jobform-container">
        {jobApplications.length > 0 ? (
          jobApplications.map((job) => (
            <div key={job._id} className="job-form-box">
              <div className="avatar-section">
                {/* Placeholder for avatar */}
                <span className="owner-name">{job.ownerProfile.name}</span>
                <MoreVertIcon className="job-form-dropdown" />
              </div>

              <div className="job-desc">
                <div className="job-role">
                  <WorkIcon />
                  <span className="job-texts">{job.jobRole}</span>
                </div>
                <div className="job-company">
                  <BusinessIcon />
                  <span className="job-texts">{job.company}</span>
                </div>
                <div className="job-location">
                  <LocationOnIcon />
                  <span className="job-texts">{job.jobLocation}</span>
                </div>
              </div>

              {/* <div className="applicant-details">
                <h4>Applicants:</h4>
                <ul>
                  {job.applicantProfiles.map((profile) => (
                    <li key={profile.userId._id}>
                      Name: {profile.userId.name}, Status: {profile.status},
                      Resume: {profile.resume}
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          ))
        ) : (
          <div className="no-jobs-available">No job applications found.</div>
        )}
      </div>
      <div className="job-form-footer">No more applications...</div>
    </div>
  );
};

export default JobsAppliedByMe;
