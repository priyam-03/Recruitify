import { useState } from "react";
import { useDispatch } from "react-redux";
import { createJobForms } from "../store/slices/JobSlices";
import '../styles/createJobForms.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const CreateJob = () => {
    const dispatch = useDispatch();
    const salaryCurrency = ['dollar', 'rupee', 'euro', 'yen'];
    const totalDurationMode = ['month', 'year', 'full-time'];
    const salaryMode = ['per-hour', 'per-day', 'per-month', 'per-annum'];
    const locationMode = ['on-site', 'remote'];

    const [showPreview, setShowPreview] = useState(false);
    const [requiredSkill, setRequiredSkill] = useState('');
    const [jobApplication, setJobApplication] = useState({
        jobRole: '', jobLocation: '', jobLocationType: '', company: '',
        requiredSkills: [], totalDuration: { value: '', mode: '' },
        workingHours: { value: '', mode: 'hour' },
        salary: { value: '', currency: '', mode: '' },
        jobDescription: '',
    });

    const handleJobChange = ({ target: { name, value } }) => {
        setJobApplication(prev => ({ ...prev, [name]: value }));
    };

    const handleNestedChange = (key, { target: { name, value } }) => {
        setJobApplication(prev => ({
            ...prev,
            [key]: { ...prev[key], [name]: value }
        }));
    };

    const handleAddSkill = () => {
        if (requiredSkill.trim()) {
            setJobApplication(prev => ({
                ...prev,
                requiredSkills: [...prev.requiredSkills, requiredSkill.trim()],
            }));
            setRequiredSkill('');
        }
    };

    const removeSkill = (index) => {
        setJobApplication(prev => ({
            ...prev,
            requiredSkills: prev.requiredSkills.filter((_, i) => i !== index),
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddSkill();
        }
    };

    const handleSubmit = () => {
        if (!jobApplication.jobRole || !jobApplication.jobDescription || !jobApplication.company || !jobApplication.jobLocation || !jobApplication.jobLocationType) {
            alert("Please fill out all required fields.");
            return;
        }
        dispatch(createJobForms({ content: jobApplication }));
        setJobApplication({
            jobRole: '', jobLocation: '', jobLocationType: '', company: '',
            requiredSkills: [], totalDuration: { value: '', mode: '' },
            workingHours: { value: '', mode: 'hour' },
            salary: { value: '', currency: '', mode: '' },
            jobDescription: '',
        });
        setShowPreview(false);
    };

    return (
        <div className="create-form-container">
            <div className="create-form-content">
                {!showPreview ? (
                    <>
                        <div className="create-row">
                            <input type="text" name="jobRole" value={jobApplication.jobRole} onChange={handleJobChange} placeholder="Job Role" className="create-role-loc-form" />
                            <input type="text" name="company" value={jobApplication.company} onChange={handleJobChange} placeholder="Company" className="create-role-loc-form" />
                        </div>
                        <div className="create-row">
                            <input type="text" name="jobLocation" value={jobApplication.jobLocation} onChange={handleJobChange} placeholder="Job Location" className="create-role-loc-form" />
                            <select name="jobLocationType" value={jobApplication.jobLocationType} onChange={handleJobChange} className="create-form-select">
                                <option value="">Location Mode</option>
                                {locationMode.map((mode) => (
                                    <option key={mode} value={mode}>{mode}</option>
                                ))}
                            </select>
                        </div>
                        <div className="create-skills-form-control">
                            <input
                                type="text"
                                value={requiredSkill}
                                onChange={e => setRequiredSkill(e.target.value)}
                                placeholder="Add Skill"
                                className="create-role-loc-form"
                                onKeyPress={handleKeyPress}
                            />
                            <AddIcon onClick={handleAddSkill} className="create-add-skill-button" />
                        </div>
                        <div className="create-requiredskills-flex">
                            {jobApplication.requiredSkills.map((skill, index) => (
                                <div key={index} className="create-skill-item">
                                    <span>{skill}</span>
                                    <RemoveCircleOutlineIcon onClick={() => removeSkill(index)} className="create-remove-skill-button" />
                                </div>
                            ))}
                        </div>
                        <div className="create-desc-form-control">
                            <textarea name="jobDescription" value={jobApplication.jobDescription} onChange={handleJobChange} placeholder="Description" className="create-desc-form-textarea" />
                        </div>
                        <div className="create-row">
                            <input type="text" name="value" value={jobApplication.salary.value} onChange={e => handleNestedChange('salary', e)} placeholder="Salary Amount" className="create-role-loc-form" />
                            <select name="currency" value={jobApplication.salary.currency} onChange={e => handleNestedChange('salary', e)} className="create-form-select">
                                <option value="">Currency</option>
                                {salaryCurrency.map(currency => (
                                    <option key={currency} value={currency}>{currency}</option>
                                ))}
                            </select>
                            <select name="mode" value={jobApplication.salary.mode} onChange={e => handleNestedChange('salary', e)} className="create-form-select">
                                <option value="">Salary Mode</option>
                                {salaryMode.map(mode => (
                                    <option key={mode} value={mode}>{mode}</option>
                                ))}
                            </select>
                        </div>
                        <button className="create-button" onClick={() => setShowPreview(true)}>Preview</button>
                    </>
                ) : (
                    <div className="create-preview-container">
                        <h2 className="create-preview-heading">Preview Job</h2>
                        <button className="create-button" onClick={handleSubmit}>Confirm</button>
                        <button className="create-button" onClick={() => setShowPreview(false)}>Edit</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateJob;
