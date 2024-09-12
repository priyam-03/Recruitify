import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchShortlistedApplicants } from "../store/slices/JobSlices";
import styles from "../styles/shortlistedApplicants.module.css";

const ShortlistedApplicants = () => {
  const { formId } = useParams();
  const { noOfApplicants } = useParams(); // Get noOfApplicants from query params

  const dispatch = useDispatch();
  const shortlistedApplicants = useSelector(
    (state) => state.jobs.shortlistedApplicants
  );
  console.log("shortlistApplication" + JSON.stringify(shortlistedApplicants));
  const loading = useSelector((state) => state.jobs.isLoading);

  useEffect(() => {
    if (formId && noOfApplicants) {
      dispatch(fetchShortlistedApplicants({ formId, noOfApplicants }));
    }
  }, [dispatch, formId, noOfApplicants]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (shortlistedApplicants.length === 0) {
    return <div>No shortlisted applicants yet.</div>;
  }

  return (
    <div className={styles.shortlistedPage}>
      <h2>Shortlisted Applicants</h2>
      {shortlistedApplicants.map((applicant, index) => (
        <div key={index} className={styles.applicantItem}>
          <span>{applicant.userId.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ShortlistedApplicants;
