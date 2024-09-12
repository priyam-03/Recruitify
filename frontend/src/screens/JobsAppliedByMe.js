import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

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

const JobsAppliedByMe = () => {
  const [status, setStatus] = useState(""); // Manage filter state
  const { loading, error, data } = useQuery(GET_JOB_APPLICATIONS, {
    variables: { status },
    skip: status === null, // Skip query if status is null (optional)
  });
  console.log(data);
  // Function to handle status change
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Job Applications</h1>

      {/* Status Filter */}
      <label htmlFor="status-filter">Filter by status:</label>
      <select id="status-filter" value={status} onChange={handleStatusChange}>
        <option value="">All</option>
        <option value="applied">Applied</option>
        <option value="shortlisted">Interviewed</option>
        <option value="hired">Hired</option>
        <option value="rejected">Rejected</option>
        {/* Add other status options as needed */}
      </select>

      {/* Job Application List */}
      <div>
        {data.jobAppliedByMe.map((job) => (
          <div key={job._id}>
            <h3>{job.jobRole}</h3>
            <p>Location: {job.jobLocation}</p>
            <p>Company: {job.company}</p>
            <h4>Applicants:</h4>
            <ul>
              {job.applicantProfiles.map((profile) => (
                <li key={profile.userId._id}>
                  name: {profile.userId.name}, Status: {profile.status}, Resume:{" "}
                  {profile.resume}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsAppliedByMe;
