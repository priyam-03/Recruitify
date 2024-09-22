import { useEffect, useState } from "react";
import styles from "../styles/experience.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addExperience, fetchExperiences } from "../store/slices/profileSlices";
import Checkbox from "@mui/material/Checkbox";
import FreeSolo from "../shared/components/FreeSolo";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import WorkIcon from "@mui/icons-material/Work";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Error from "../shared/components/Error";
const top10Universities = [
  "Indian Institute of Technology Kharagpur",
  "Jadavpur University",
  "University of Calcutta",
  "Visva-Bharati University",
  "West Bengal University of Technology",
  "Presidency University",
  "Bengal Engineering and Science University",
  "University of Burdwan",
  "North Bengal University",
  "Rabindra Bharati University",
];

const specializationList = [
  "Computer Science and Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Aerospace Engineering",
  "Biomedical Engineering",
  "Chemical Engineering",
  "Environmental Engineering",
  "Industrial Engineering",
  "Materials Science and Engineering",
];

const yearList = [
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
];

const designationList = [
  "School Student",
  "Bachelor Student",
  "Masters Student",
  "PHD Student",
];

const ExperienceForm = () => {
  const dispatch = useDispatch();
  const experiences = useSelector((state) => state.profile.experiences);
  const errorMessage = useSelector((state) => state.profile.errorMessage);
  useEffect(() => {
    dispatch(fetchExperiences());
  }, [dispatch]);

  const initialExperience = {
    organization: "",
    role: "",
    otherInfo: "",
    timeStrap: {
      isCurrent: false,
      start_year: "",
      end_year: "",
    },
  };

  const [experienceInfo, setExperienceInfo] = useState({
    ...initialExperience,
  });
  const [active, setActive] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = ({ name, value, checked }) => {
    if (name === "isCurrent") {
      setExperienceInfo((prevInfo) => ({
        ...prevInfo,
        timeStrap: {
          ...prevInfo.timeStrap,
          isCurrent: checked,
        },
      }));
    } else if (name === "start_year" || name === "end_year") {
      setExperienceInfo((prevInfo) => ({
        ...prevInfo,
        timeStrap: {
          ...prevInfo.timeStrap,
          [name]: value,
        },
      }));
    } else {
      setExperienceInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!experienceInfo.organization)
      newErrors.organization = "Organization is required";
    if (!experienceInfo.role) newErrors.role = "Role is required";
    if (!experienceInfo.timeStrap.start_year)
      newErrors.start_year = "Start year is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(addExperience(experienceInfo));
    setExperienceInfo({ ...initialExperience });
    setActive(!active);
  };

  return (
    <div className={styles.container}>
      {errorMessage && <Error>{errorMessage}</Error>}
      <h2 className={styles.heading}>Experience Information</h2>
      {active ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formControl}>
            <div className={styles.formFlex}>
              <FreeSolo
                options={top10Universities}
                label={"Organization"}
                value={experienceInfo.organization}
                name="organization"
                handleChange={handleChange}
              />
            </div>
            {errors.organization && (
              <p className={styles.error}>{errors.organization}</p>
            )}
          </div>

          <div className={styles.formControl}>
            <div className={styles.formFlex}>
              <FreeSolo
                options={specializationList}
                label={"Role"}
                value={experienceInfo.role}
                name="role"
                handleChange={handleChange}
              />
            </div>
            {errors.role && <p className={styles.error}>{errors.role}</p>}
          </div>

          <div className={styles.formControl}>
            <div className={styles.formFlex}>
              <label className={styles.formLabel}>Other Information</label>
              <input
                className={styles.inputBox}
                placeholder="Enter any other information"
                name="otherInfo"
                value={experienceInfo.otherInfo}
                onChange={(e) =>
                  handleChange({ name: e.target.name, value: e.target.value })
                }
              />
            </div>
          </div>

          <div className={styles.timestrap}>
            <div className={styles.years_start_end}>
              <div className={styles.formFlex}>
                <FreeSolo
                  options={yearList}
                  label={"Year Start"}
                  value={experienceInfo.timeStrap.start_year}
                  name="start_year"
                  handleChange={handleChange}
                />
              </div>
              {errors.start_year && (
                <p className={styles.error}>{errors.start_year}</p>
              )}
            </div>
            <div className={styles.years_start_end}>
              <div className={styles.formFlex}>
                <FreeSolo
                  options={yearList}
                  label={"Year End"}
                  value={experienceInfo.timeStrap.end_year}
                  name="end_year"
                  handleChange={handleChange}
                  disabled={experienceInfo.timeStrap.isCurrent}
                />
              </div>
            </div>
            <div className={styles.years_start_end}>
              <div className={styles.formFlex}>
                <Checkbox
                  checked={experienceInfo.timeStrap.isCurrent}
                  onChange={(e) =>
                    handleChange({
                      name: e.target.name,
                      checked: e.target.checked,
                    })
                  }
                  name="isCurrent"
                />
                <span>Current?</span>
              </div>
            </div>
          </div>

          <div className={styles.flexContainer}>
            <button
              type="button"
              className={styles.button}
              onClick={() => setActive(!active)}
            >
              Cancel
            </button>
            <button type="submit" className={styles.button}>
              Apply Changes
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.addExperience}>
          <div className={styles.addExperienceHeader}>
            <AddCircleOutlineIcon
              className={styles.addCircleOutlineIcon}
              onClick={() => setActive(!active)}
            />
            <span className={styles.addExperienceText}>Add new Experience</span>
          </div>
          <div className={styles.experienceList}>
            {experiences.length > 0 &&
              experiences.map((experience) => (
                <div
                  key={experience._id}
                  className={styles.experienceContainer}
                >
                  <WorkIcon className={styles.schoolIcon} />
                  <div className={styles.experienceDetails}>
                    <div className={styles.experienceHeader}>
                      <span>
                        {experience.timeStrap.isCurrent ? "Works" : "Worked"} as{" "}
                        {experience.role} at {experience.organization}
                      </span>
                    </div>
                    <div className={styles.experienceBody}>
                      from {experience.timeStrap.start_year} to{" "}
                      {experience.timeStrap.end_year}
                    </div>
                  </div>
                  <IconButton
                    aria-label="Example"
                    className={styles.iconButton}
                  >
                    <MoreHorizIcon className={styles.morevert} />
                  </IconButton>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
