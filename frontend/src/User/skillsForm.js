import React, { useState, useEffect } from 'react';
import styles from '../styles/skills.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addSkill, fetchSkills } from '../store/slices/profileSlices';
import { Button, Slider, Typography } from '@mui/material';
import FreeSolo from '../shared/components/FreeSolo';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { fetchAllSkills } from '../store/slices/skillSlices';

const SkillForm = () => {
  const [active, setActive] = useState(false);
  const [skillInfo, setSkillInfo] = useState({ skill: '', level: 1, skillId: '' });

  const dispatch = useDispatch();
  const skills = useSelector((state) => state.profile.skills);
  const skillsList = useSelector((state) => state.skills.skillsList ?? []);

  useEffect(() => {
    dispatch(fetchAllSkills());
    dispatch(fetchSkills());
  }, [dispatch]);

  const handleChange = ({ name, value }) => {
    setSkillInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));

    if (name === 'skill') {
      const selectedSkill = skillsList.find((skill) => skill.name === value);
      setSkillInfo((prevInfo) => ({
        ...prevInfo,
        skillId: selectedSkill ? selectedSkill._id : '',
      }));
    }
  };

  const handleSliderChange = (event, newValue) => {
    setSkillInfo((prevInfo) => ({
      ...prevInfo,
      level: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const skillData = { skillId: skillInfo.skillId, level: skillInfo.level };

    // Dispatch addSkill and fetchSkills after it's added
    dispatch(addSkill(skillData));
    dispatch(fetchSkills());

    setSkillInfo({ skill: '', level: 1, skillId: '' });
    setActive(false);
  };

  const handleCancel = () => {
    setActive(false);
    setSkillInfo({ skill: '', level: 1, skillId: '' });
  };

  if (!skillsList || skillsList.length === 0) {
    return <div>Loading skills...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Your Skills</h2>
      {active ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formControl}>
            <div className={styles.formFlex}>
              <FreeSolo
                options={skillsList.map((skill) => skill.name)}
                label={'Skill'}
                value={skillInfo.skill}
                name="skill"
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
            <button type="button" className={styles.button} onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className={styles.button}>
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
            {skills.length > 0 &&
              skills.map((skill,index) => (
                <div key={index} className={styles.skillItem}>
                  <div className={styles.skillName}>
                    {skill.skillId.name || 'Unknown Skill'}
                  </div>
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
