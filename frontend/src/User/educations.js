import { useEffect, useState } from 'react';
import styles from '../styles/education.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addEducation, fetchEducations } from '../store/slices/profileSlices';
import Checkbox from '@mui/material/Checkbox';
import FreeSolo from '../shared/components/FreeSolo';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SchoolIcon from '@mui/icons-material/School';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

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
    const educations = useSelector((state) => state.profile.educations);

    useEffect(() => {
        dispatch(fetchEducations());
    }, [dispatch]);

    const initialEducationInfo = {
        institution: '',
        specialization: '',
        designation: '',
        gpa: '',
        otherInfo: '',
        timeStrap: {
            isCurrent: false,
            start_year: '',
            end_year: '',
        },
    };

    const [educationInfo, setEducationInfo] = useState({ ...initialEducationInfo });
    const [active, setActive] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = ({ name, value, checked }) => {
        if (name === 'isCurrent') {
            setEducationInfo((prevInfo) => ({
                ...prevInfo,
                timeStrap: {
                    ...prevInfo.timeStrap,
                    isCurrent: checked,
                },
            }));
        } else if (name === 'start_year' || name === 'end_year') {
            setEducationInfo((prevInfo) => ({
                ...prevInfo,
                timeStrap: {
                    ...prevInfo.timeStrap,
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

    const validate = () => {
        const newErrors = {};
        if (!educationInfo.institution) newErrors.institution = 'Institution is required';
        if (!educationInfo.designation) newErrors.designation = 'Designation is required';
        if (!educationInfo.timeStrap.start_year) newErrors.start_year = 'Start year is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        dispatch(addEducation(educationInfo));
        setEducationInfo({ ...initialEducationInfo });
        setActive(!active);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Education Information</h2>
            {active ? (
                <form className={styles.form}>
                    <div className={styles.formControl}>
                        <div className={styles.formFlex}>
                            <FreeSolo
                                options={top10Universities}
                                label={'Institutions'}
                                value={educationInfo.institution}
                                name="institution"
                                handleChange={handleChange}
                            />
                            {errors.institution && <span className={styles.error}>{errors.institution}</span>}
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
                            {errors.specialization && <span className={styles.error}>{errors.specialization}</span>}
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
                            {errors.designation && <span className={styles.error}>{errors.designation}</span>}
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
                                    value={educationInfo.timeStrap.start_year}
                                    name="start_year"
                                    handleChange={handleChange}
                                />
                                {errors.start_year && <span className={styles.error}>{errors.start_year}</span>}
                            </div>
                        </div>
                        <div className={styles.years_start_end}>
                            <div className={styles.formFlex}>
                                <FreeSolo
                                    options={yearList}
                                    label={'Year End'}
                                    value={educationInfo.timeStrap.end_year}
                                    name="end_year"
                                    handleChange={handleChange}
                                    disabled={educationInfo.timeStrap.isCurrent}
                                />
                                {errors.end_year && <span className={styles.error}>{errors.end_year}</span>}
                            </div>
                        </div>
                        <div className={styles.years_start_end}>
                            <div className={styles.formFlex}>
                                <Checkbox
                                    checked={educationInfo.timeStrap.isCurrent}
                                    onChange={(e) => handleChange({ name: e.target.name, checked: e.target.checked })}
                                    name="isCurrent"
                                />
                                <span>Current?</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.flexContainer}>
                        <button type="button" className={styles.button} onClick={() => setActive(!active)}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.button} onClick={handleSubmit}>
                            Apply Changes
                        </button>
                    </div>
                </form>
            ) : (
                <div className={styles.addEducation}>
                    <div className={styles.addEducationHeader}>
                        <AddCircleOutlineIcon className={styles.addCircleOutlineIcon} onClick={() => setActive(!active)} />
                        <span className={styles.addEducationText}>Add new Education Information</span>
                    </div>
                    <div className={styles.educationList}>
                        {educations.length > 0 &&
                            educations.map((education) => (
                                <div key={education._id} className={styles.educationContainer}>
                                    <SchoolIcon className={styles.schoolIcon} />
                                    <div className={styles.educationDetails}>
                                        <div className={styles.educationHeader}>
                                            <span>
                                                {education.timeStrap.isCurrent ? 'Studies' : 'Studied'} {education.specialization} at {education.institution}
                                            </span>
                                        </div>
                                        <div className={styles.educationBody}>
                                            from {education.timeStrap.start_year} to {education.timeStrap.end_year}
                                        </div>
                                    </div>
                                    <IconButton aria-label="Example" className={styles.iconButton}>
                                        <MoreHorizIcon className={styles.morevert}/>
                                    </IconButton>
                                </div>
                            ))}
                    </div>
                </div>

            )}
        </div>
    );
};

export default EducationForm;
