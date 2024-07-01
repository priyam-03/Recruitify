import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyForJob, fetchJobForms } from "../store/slices/JobSlices";
import "../styles/jobForms.css";
import { Button, Flex } from "@chakra-ui/react";

const JobForms = ({ id, type }) => {
    const dispatch = useDispatch();
    const jobForms = useSelector((state) => state.jobs.data);
    const isLoading = useSelector((state) => state.jobs.isLoading);
    const { userInfo } = useSelector((state) => state.auth);
    const [showApplicants, setShowApplicants] = useState({});
    useEffect(() => {
        dispatch(fetchJobForms(id));
    }, [dispatch, id]);

    const [userDetails, setUserDetails] = useState({});
    const [appliedForms, setAppliedForms] = useState({});
    const [errorMessages, setErrorMessages] = useState({});

    const handleFieldChange = (event, formId) => {
        const { name, value } = event.target;
        setUserDetails((prev) => ({
            ...prev,
            [formId]: {
                ...prev[formId],
                [name]: value,
            },
        }));
    };

    const handleApplicantButton = (formId) => {
        setShowApplicants((prev) => ({
            ...prev,
            [formId]: prev[formId] === true ? false : true,
        }));
    };


    const handleApply = (formId) => {
        setAppliedForms((prev) => ({
            ...prev,
            [formId]: true
        }));
    };

    const handleCancelButton = (formId) => {
        setUserDetails((prev) => ({
            ...prev,
            [formId]: {}
        }));
        setAppliedForms((prev) => ({
            ...prev,
            [formId]: false
        }));
        setErrorMessages((prev) => ({
            ...prev,
            [formId]: null
        }));
    };

    const handleConfirmButton = (formId, jobForm) => {
        const requiredFields = jobForm.requiredUserDetails;
        const userFields = userDetails[formId] || {};

        const missingFields = Object.keys(requiredFields).filter((field) => {
            return requiredFields[field].isRequired && !userFields[field];
        });

        if (missingFields.length > 0) {
            setErrorMessages((prev) => ({
                ...prev,
                [formId]: `Please fill out the required fields: ${missingFields.join(", ")}`
            }));
        } else {
            setErrorMessages((prev) => ({
                ...prev,
                [formId]: null
            }));
            dispatch(applyForJob({ userId: userInfo.user._id, formId: formId, userDetails: userFields }));
            console.log("Form submitted:", userFields);
        }
    };

    if (isLoading) {
        return <div className="loading-text">Loading...</div>;
    }

    if (!Array.isArray(jobForms)) {
        return <div className="error-message">Failed to load job forms.</div>;
    }

    return (
        <div className="jobform-page">
            <h2 className="job-forms-heading">Job Application Forms</h2>
            <div className="jobform-container">
                {jobForms.length > 0 ? jobForms.map((jobForm, index) => (
                    (type === 'all' || jobForm.ownerProfile._id === userInfo.user._id) &&
                    (
                        <div key={index} className="job-form-box">
                            <div className="avatar-section">
                                <img className="avatar" src={jobForm.ownerProfile.avatar.filePath} alt={jobForm.ownerProfile.name} />
                                <span className="owner-name">{jobForm.ownerProfile.name}</span>
                            </div>
                            <div className="job-role">
                                <span className="job-label">Job Role:</span>
                                <span className="job-texts">{jobForm.jobRole}</span>
                            </div>
                            <div className="job-description">
                                <span className="job-label">Job Description:</span>
                                <span className="job-texts">{jobForm.jobDescription}</span>
                            </div>
                            {
                                jobForm.ownerProfile._id === userInfo.user._id && (
                                    <Flex justifyContent={'flex-end'}>
                                        <Button onClick={() => handleApplicantButton(jobForm._id)}>
                                            Applicants
                                        </Button>
                                    </Flex>
                                )
                            }
                            {appliedForms[jobForm._id] && (
                                <div className="user-details-section">
                                    <h3 className="user-details-heading">User Details</h3>
                                    <div className="details-list">
                                        {Object.keys(jobForm.requiredUserDetails).map((field, index) => (
                                            jobForm.requiredUserDetails[field].isSelected && (
                                                <div key={index} className="detail-item">
                                                    <span className="detail-label">{field}{jobForm.requiredUserDetails[field].isRequired && ' *'}</span>
                                                    {field === 'yearOfGraduation' ? (
                                                        <input
                                                            type="date"
                                                            value={userDetails[jobForm._id]?.[field] || ''}
                                                            name={field}
                                                            className="detail-value"
                                                            onChange={(e) => handleFieldChange(e, jobForm._id)}
                                                        />
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            value={userDetails[jobForm._id]?.[field] || ''}
                                                            name={field}
                                                            className="detail-value"
                                                            onChange={(e) => handleFieldChange(e, jobForm._id)}
                                                        />
                                                    )}
                                                </div>
                                            )
                                        ))}
                                    </div>
                                    {errorMessages[jobForm._id] && (
                                        <div className="error-message">{errorMessages[jobForm._id]}</div>
                                    )}
                                </div>
                            )}
                            {!appliedForms[jobForm._id] && jobForm.ownerProfile._id !== userInfo.user._id && (
                                <Flex justifyContent={'space-between'}>
                                    <Button onClick={() => handleApplicantButton(jobForm._id)}>
                                        Applicants
                                    </Button>
                                    <Button onClick={() => {handleApply(jobForm._id); if(showApplicants) handleApplicantButton(jobForm._id)}}>
                                        Apply
                                    </Button>
                                </Flex>
                            )}
                            {appliedForms[jobForm._id] && jobForm.ownerProfile._id !== userInfo.user._id && (
                                <Flex justifyContent={'space-between'}>
                                    <Button onClick={() => handleCancelButton(jobForm._id)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={() => handleConfirmButton(jobForm._id, jobForm)}>
                                        Confirm
                                    </Button>
                                </Flex>
                            )}
                            {showApplicants[jobForm._id] && (
                                <div className="show-applicant-box">
                                    All Applicants..
                                    {jobForm.applicantProfiles.map((profile, index) => (
                                        <div className="applicant">
                                            <Flex flexDir={'row'} key={index}>
                                                <div className="avatar-section">
                                                    <img className="avatar" src={profile.avatar.filePath} alt={profile.name} />
                                                    <span className="owner-name">{profile.name}</span>
                                                </div>
                                            </Flex>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    )
                )) : (
                    <div className="no-Jobs-avaailable">No more jobs...</div>
                )}
            </div>
        </div>
    );
};

export default JobForms;
