import { useState } from "react";
import { useDispatch } from "react-redux";
import { createJobForms } from "../store/slices/JobSlices";
import "../styles/createJobForms.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const CreateJob = () => {
  const dispatch = useDispatch();
  const salaryCurrency = ["dollar", "rupee", "euro", "yen"];
  const totalDurationMode = ["month", "year", "full-time"];
  const salaryMode = ["per-hour", "per-day", "per-month", "per-annum"];
  const locationMode = ["on-site", "remote"];

  const [showPreview, setShowPreview] = useState(false);
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [requiredSkill, setRequiredSkill] = useState("");
  const [jobApplication, setJobApplication] = useState({
    jobRole: "",
    jobLocation: "",
    jobLocationType: "",
    company: "",
    requiredSkills: [],
    totalDuration: { value: "", mode: "" },
    workingHours: { value: "", mode: "hour" },
    salary: { value: "", currency: "", mode: "" },
    jobDescription: "",
  });

  // Handle input changes
  const handleJobChange = ({ target: { name, value } }) => {
    setJobApplication((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (key, { target: { name, value } }) => {
    setJobApplication((prev) => ({
      ...prev,
      [key]: { ...prev[key], [name]: value },
    }));
  };

  const handleRequiredSkillChange = (event) =>
    setRequiredSkill(event.target.value);

  const handleAddSkill = () => {
    if (requiredSkill.trim()) {
      setRequiredSkills((prev) => [...prev, requiredSkill.trim()]);
      setJobApplication((prev) => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, requiredSkill.trim()],
      }));
      setRequiredSkill("");
    }
  };

  const removeSkill = (index) => {
    setRequiredSkills((prev) => prev.filter((_, i) => i !== index));
    setJobApplication((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (
      !jobApplication.jobRole ||
      !jobApplication.jobDescription ||
      !jobApplication.company ||
      !jobApplication.jobLocation ||
      !jobApplication.jobLocationType
    ) {
      alert("Please fill out all required fields.");
      return;
    }
    dispatch(createJobForms({ content: jobApplication }));
    setJobApplication({
      jobRole: "",
      jobLocation: "",
      jobLocationType: "",
      company: "",
      requiredSkills: [],
      totalDuration: { value: "", mode: "" },
      workingHours: { value: "", mode: "hour" },
      salary: { value: "", currency: "", mode: "" },
      jobDescription: "",
    });
    setRequiredSkills([]);
    setShowPreview(false);
  };

  return (
    <div className="create-form-container">
      <div>
        {!showPreview ? (
          <>
            {/* Job Role, Company, and Location */}
            <div className="create-select">
              <div className="create-form-control">
                <label className="create-form-label">Job Role</label>
                <input
                  type="text"
                  name="jobRole"
                  value={jobApplication.jobRole}
                  onChange={handleJobChange}
                  className="create-role-loc-form"
                  required
                />
              </div>
              <div className="create-form-control">
                <label className="create-form-label">Company</label>
                <input
                  type="text"
                  name="company"
                  value={jobApplication.company}
                  onChange={handleJobChange}
                  className="create-role-loc-form"
                  required
                />
              </div>
            </div>

            {/* Location and Mode */}
            <div className="create-select">
              <div className="create-form-control">
                <label className="create-form-label">Job Location</label>
                <input
                  type="text"
                  name="jobLocation"
                  value={jobApplication.jobLocation}
                  onChange={handleJobChange}
                  className="create-role-loc-form"
                  required
                />
              </div>
              <div className="create-form-control">
                <label className="create-form-label">Location Mode</label>
                <select
                  name="jobLocationType"
                  value={jobApplication.jobLocationType}
                  onChange={handleJobChange}
                  className="create-form-select"
                  required
                >
                  <option value="">Select location mode</option>
                  {locationMode.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Skills */}
            <div className="create-skills-form-control">
              <label className="create-form-label">
                Choose Required Skills
              </label>
              <div className="create-requiredskills-flex">
                <input
                  type="text"
                  value={requiredSkill}
                  onChange={handleRequiredSkillChange}
                  className="create-role-loc-form"
                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                />
                <AddIcon
                  onClick={handleAddSkill}
                  className="create-add-skill-button"
                />
              </div>
            </div>

            {requiredSkills.length > 0 && (
              <div className="create-form-selectedSkills">
                {requiredSkills.map((skill, index) => (
                  <div key={index} className="create-form-selected-skill">
                    <span className="create-form-selected-skill-text">
                      {skill}
                    </span>
                    <RemoveCircleOutlineIcon
                      className="create-remove-skill"
                      onClick={() => removeSkill(index)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Job Description */}
            <div className="create-desc-form-control">
              <label className="create-form-label">Description</label>
              <textarea
                name="jobDescription"
                value={jobApplication.jobDescription}
                onChange={handleJobChange}
                className="create-desc-form-textarea"
                required
              />
            </div>

            {/* Salary */}
            <div className="create-select">
              <div className="create-form-control">
                <label className="create-form-label">Salary Amount</label>
                <input
                  type="text"
                  name="value"
                  value={jobApplication.salary.value}
                  onChange={(e) => handleNestedChange("salary", e)}
                  className="create-role-loc-form"
                  required
                />
              </div>
              <div className="create-form-control">
                <label className="create-form-label">Salary Currency</label>
                <select
                  name="currency"
                  value={jobApplication.salary.currency}
                  onChange={(e) => handleNestedChange("salary", e)}
                  className="create-form-select"
                  required
                >
                  <option value="">Select currency</option>
                  {salaryCurrency.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
              <div className="create-form-control">
                <label className="create-form-label">Salary Mode</label>
                <select
                  name="mode"
                  value={jobApplication.salary.mode}
                  onChange={(e) => handleNestedChange("salary", e)}
                  className="create-form-select"
                  required
                >
                  <option value="">Select salary mode</option>
                  {salaryMode.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Total Duration */}
            <div className="create-select">
              <div className="create-form-control">
                <label className="create-form-label">Total Duration</label>
                <input
                  type="text"
                  name="value"
                  value={jobApplication.totalDuration.value}
                  onChange={(e) => handleNestedChange("totalDuration", e)}
                  className="create-role-loc-form"
                  required
                />
              </div>
              <div className="create-form-control">
                <label className="create-form-label">Total Duration Mode</label>
                <select
                  name="mode"
                  value={jobApplication.totalDuration.mode}
                  onChange={(e) => handleNestedChange("totalDuration", e)}
                  className="create-form-select"
                  required
                >
                  <option value="">Select duration mode</option>
                  {totalDurationMode.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Working Hours */}
            <div className="create-select">
              <div className="create-form-control">
                <label className="create-form-label">
                  Working Hours per Day
                </label>
                <input
                  type="text"
                  name="value"
                  value={jobApplication.workingHours.value}
                  onChange={(e) => handleNestedChange("workingHours", e)}
                  className="create-role-loc-form"
                  required
                />
              </div>
            </div>

            {/* Preview Button */}
            <div className="create-button-container">
              <button
                className="create-button"
                onClick={() => setShowPreview(true)}
              >
                Preview
              </button>
            </div>
          </>
        ) : (
          // Preview Section
          <div className="create-preview-container">
            <h2 className="create-preview-heading">Preview Job</h2>

            {/* Preview Job Details */}
            <div className="create-preview-field">
              <span className="create-preview-value">
                {jobApplication.jobRole} ({jobApplication.company}) |{" "}
                {requiredSkills.map((skill, index) => (
                  <span key={index}>
                    {skill}
                    {index !== requiredSkills.length - 1 && ", "}
                  </span>
                ))}
              </span>
            </div>

            {/* Location Preview */}
            {jobApplication.jobLocation && jobApplication.jobLocationType && (
              <div className="create-preview-field">
                Location:{" "}
                <span className="preview-value">
                  {jobApplication.jobLocation} ({jobApplication.jobLocationType}
                  )
                </span>
              </div>
            )}

            {/* Salary Preview */}
            {jobApplication.salary.value &&
              jobApplication.salary.currency &&
              jobApplication.salary.mode && (
                <div className="create-preview-field">
                  Salary: {jobApplication.salary.value}{" "}
                  {jobApplication.salary.currency} {jobApplication.salary.mode}
                </div>
              )}

            {/* Job Duration Preview */}
            {jobApplication.totalDuration.value &&
              jobApplication.totalDuration.mode && (
                <div className="create-preview-field">
                  Job Duration: {jobApplication.totalDuration.value}{" "}
                  {jobApplication.totalDuration.mode}
                </div>
              )}

            {/* Working Hours Preview */}
            {jobApplication.workingHours.value && (
              <div className="create-preview-field">
                Working Hours: {jobApplication.workingHours.value} hour(s) per
                day
              </div>
            )}

            {/* Job Description Preview */}
            {jobApplication.jobDescription && (
              <div className="create-preview-field">
                <label className="create-preview-label">Description:</label>
                <span className="create-preview-value">
                  {jobApplication.jobDescription}
                </span>
              </div>
            )}

            {/* Confirm or Edit */}
            <div className="create-button-container">
              <button className="create-button" onClick={handleSubmit}>
                Confirm
              </button>
              <button
                className="create-button"
                onClick={() => setShowPreview(false)}
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateJob;
