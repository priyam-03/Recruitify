import React, { useState, useEffect } from 'react';
import styles from '../styles/skills.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addSkill, fetchSkills } from '../store/slices/profileSlices';
import { Button, Slider, Typography } from '@mui/material';
import FreeSolo from '../shared/components/FreeSolo';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const skillsList = [
  "Reactjs", "Nodejs", "JavaScript", "HTML", "CSS", "Python", "Java", "C++",
  "C#", "Ruby", "PHP", "Swift", "Kotlin", "TypeScript", "SQL", "NoSQL",
  "MongoDB", "PostgreSQL", "MySQL", "SQLite", "Django", "Flask", "Spring",
  "Express.js", "Laravel", "Angular", "Vue.js", "Svelte", "Gatsby", "Next.js",
  "Nuxt.js", "GraphQL", "RESTful APIs", "AWS", "Azure", "Google Cloud",
  "Docker", "Kubernetes", "Terraform", "Ansible", "Git", "GitHub", "GitLab",
  "Bitbucket", "Jenkins", "CI/CD", "Webpack", "Babel", "Sass", "Less",
  "Bootstrap", "Tailwind CSS", "Material-UI", "Ant Design", "Chakra UI",
  "Redux", "MobX", "Recoil", "RxJS", "Jest", "Mocha", "Chai", "Enzyme",
  "Cypress", "Puppeteer", "Playwright", "Selenium", "Photoshop", "Illustrator",
  "Figma", "Sketch", "InDesign", "XD", "Blender", "Unity", "Unreal Engine",
  "MATLAB", "AutoCAD", "SolidWorks", "Excel", "Word", "PowerPoint", "Outlook",
  "Slack", "Trello", "JIRA", "Asana", "Notion", "Confluence", "Salesforce",
  "SAP", "Tableau", "Power BI", "QlikView", "R", "SPSS", "Stata", "Hadoop",
  "Spark", "Kafka", "Elasticsearch", "Logstash", "Kibana", "TensorFlow",
  "Keras", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "SciPy"
];

const SkillForm = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.profile.skills);

  useEffect(() => {

    dispatch(fetchSkills());
  }, [dispatch]);

  const initialSkill = {
    skill_name: '',
    level: 1,
  };

  const [skillInfo, setSkillInfo] = useState({ ...initialSkill });
  const [active, setActive] = useState(false);

  const handleChange = ({ name, value, checked }) => {
    console.log(`handleChange called with name: ${name}, value: ${value}`);
    setSkillInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSliderChange = (event, newValue) => {
    setSkillInfo((prevInfo) => ({
      ...prevInfo,
      level: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting skillInfo:', skillInfo);
    dispatch(addSkill(skillInfo));
    setSkillInfo({ ...initialSkill });
    setActive(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Your Skills</h2>
      {active ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formControl}>
            <div className={styles.formFlex}>
              <FreeSolo
                options={skillsList}
                label={'Skill'}
                value={skillInfo.skill_name}
                name="skill_name"
                handleChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.formControl}>
            <Typography gutterBottom>Skill Level</Typography>
            <Slider
              aria-label="Skill Level"
              value={skillInfo.level}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={5}
            />
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
        <div className={styles.addSkill}>
          <div className={styles.addSkillButton}>
            <AddCircleOutlineIcon className={styles.addCircleOutlineIcon} onClick={() => setActive(true)} />

            <span className={styles.addSkillText}>Add new Skill</span>
          </div>
          <div className={styles.skillList}>
            {skills.length > 0 && skills.map((skill) => (
              <div key={skill._id} className={styles.skillItem}>
                <div className={styles.skillName}>{skill.skill_name}</div>
                <div className={styles.space}></div>
                <Slider
                  className={styles.skillLevelSlider}
                  value={skill.level}
                  aria-labelledby="skill-level-slider"
                  step={1}
                  marks
                  min={0}
                  max={5}
                  valueLabelDisplay="auto"
                  disabled
                />
                <IconButton aria-label="Example" className={styles.iconButton}>
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

export default SkillForm;
