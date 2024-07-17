import React, { useState } from 'react';
import styles from '../styles/education.module.css';
import { useDispatch } from 'react-redux';
import { updateEducation } from '../store/slices/profileSlices';
import Checkbox from '@mui/material/Checkbox';
import FreeSolo from '../shared/components/FreeSolo'; 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const top10Universities = [
    'Indian Institute of Technology Kharagpur',
    'Jadavpur University',
    'University of Calcutta',
    'Visva-Bharati University',
    'West Bengal University of Technology',
    'Presidency University',
    'Bengal Engineering and Science University',
    'University of Burdwan',
    'North Bengal University',
    'Rabindra Bharati University',
];

const specializationList = [
    'Computer Science and Engineering',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Aerospace Engineering',
    'Biomedical Engineering',
    'Chemical Engineering',
    'Environmental Engineering',
    'Industrial Engineering',
    'Materials Science and Engineering',
];

const yearList = [
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
];

const designationList = [
    'School Student',
    'Bachelor Student',
    'Masters Student',
    'PHD Student',
];

const EducationForm = () => {
    const dispatch = useDispatch();

    const initialEducationInfo = {
        institution: '',
        specialization: '',
        designation: '',
        gpa: '',
        otherInfo: '',
        timestrap: {
            isCurrent: false,
            start_year: '',
            end_year: '',
        },
    };

    const [educationInfo, setEducationInfo] = useState({ ...initialEducationInfo });
    const [active, setActive] = useState(false);

   

    // Handle input changes
    const handleChange = ({ name, value, checked }) => {
        if (name === 'isCurrent') {
            setEducationInfo((prevInfo) => ({
                ...prevInfo,
                timestrap: {
                    ...prevInfo.timestrap,
                    isCurrent: checked,
                },
            }));
        } else if (name === 'start_year' || name === 'end_year') {
            setEducationInfo((prevInfo) => ({
                ...prevInfo,
                timestrap: {
                    ...prevInfo.timestrap,
                    [name]: value,
                },
            }));
        } else {
            setEducationInfo((prevInfo) => ({
                ...prevInfo,
                [name]: value,
            }));
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Dispatch action to update education info in Redux store
        dispatch(updateEducation(educationInfo));

        // Reset form fields and toggle edit mode
        setEducationInfo({ ...initialEducationInfo });
        setActive(!active);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Education Information</h2>
            {active===true ?
                (<form  className={styles.form}>
                    <div className={styles.formControl}>
                        <div className={styles.formFlex}>
                            <FreeSolo
                                options={top10Universities}
                                label={'Institutions'}
                                value={educationInfo.institution}
                                name="institution"
                                handleChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={styles.formControl}>
                        <div className={styles.formFlex}>
                            <FreeSolo
                                options={specializationList}
                                label={'Specialization'}
                                value={educationInfo.specialization}
                                name="specialization"
                                handleChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={styles.formControl}>
                        <div className={styles.formFlex}>
                            <FreeSolo
                                options={designationList}
                                label={'Designation'}
                                value={educationInfo.designation}
                                name="designation"
                                handleChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className={styles.formControl}>
                        <div className={styles.formFlex}>
                            <label className={styles.formLabel}>CGPA/Percentage</label>
                            <input
                                className={styles.inputBox}
                                type="text"
                                placeholder="Enter Your CGPA/Percentage"
                                name="gpa"
                                value={educationInfo.gpa}
                                onChange={(e) => handleChange({ name: e.target.name, value: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className={styles.formControl}>
                        <div className={styles.formFlex}>
                            <label className={styles.formLabel}>Other Information</label>
                            <input
                                className={styles.inputBox}
                                placeholder="Enter any other information"
                                name="otherInfo"
                                value={educationInfo.otherInfo}
                                onChange={(e) => handleChange({ name: e.target.name, value: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className={styles.timestrap}>
                        <div className={styles.years_start_end}>
                            <div className={styles.formFlex}>
                                <FreeSolo
                                    options={yearList}
                                    label={'Year Start'}
                                    value={educationInfo.timestrap.start_year}
                                    name="start_year"
                                    handleChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styles.years_start_end}>
                            <div className={styles.formFlex}>
                                <FreeSolo
                                    options={yearList}
                                    label={'Year End'}
                                    value={educationInfo.timestrap.end_year}
                                    name="end_year"
                                    handleChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styles.years_start_end}>
                            <div className={styles.formFlex}>
                                <Checkbox
                                    checked={educationInfo.timestrap.isCurrent}
                                    onChange={(e) => handleChange({ name: e.target.name, checked: e.target.checked })}
                                    name="isCurrent"
                                />
                                <span>Current?</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.flexContainer}>
                        <button type="cancel" className={styles.button} onClick={()=>setActive(!active)}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.button} onClick={handleSubmit}>
                            Apply Changes
                        </button>
                    </div>
                </form>) :
                (<div className={styles.addEducation}>
                    <AddCircleOutlineIcon className ={styles.addCircleOutlineIcon} onClick={()=>setActive(!active)}/> <text className={styles.addEducationText}>Add new Education Information</text>
                </div>)
            }
        </div>
    );
};

export default EducationForm;
