import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Heading,
  Button,
} from '@chakra-ui/react';
import '../styles/skills.css';

const fields = {
  Science: ['Physics', 'Chemistry', 'Biology'],
  Arts: ['Painting', 'Sculpture', 'Music', 'Theatre', 'Film'],
  Sports: ['Football', 'Basketball', 'Tennis', 'Swimming', 'Athletics'],
  Technology: ['Programming', 'Networking', 'Cybersecurity', 'Data Science', 'AI & Machine Learning'],
  Engineering: ['Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Software Engineering', 'Chemical Engineering'],
  Pharmacy: ['Pharmacology', 'Medicinal Chemistry', 'Clinical Pharmacy', 'Pharmaceutical Technology', 'Pharmacognosy'],
  Business: ['Marketing', 'Finance', 'Human Resources', 'Operations Management', 'Entrepreneurship'],
  Law: ['Corporate Law', 'Criminal Law', 'Family Law', 'Intellectual Property Law', 'Environmental Law'],
  Education: ['Curriculum Development', 'Instructional Design', 'Special Education', 'Educational Psychology', 'Education Technology'],
  Healthcare: ['Nursing', 'Public Health', 'Health Administration', 'Clinical Research', 'Medical Imaging']
};

const SkillForm = () => {
  const [selectedField, setSelectedField] = useState({
    field: '',
    skills: [],
  });
  const [mySkills, setMyskills] = useState({})

  const handleApply = () => {
    setMyskills((prev) => ({
      ...prev,
      [selectedField.field]: [
        ...new Set([...(prev[selectedField.field] ||[]),...selectedField.skills])
      ],
    }));
  }

  const handleFieldChange = (event) => {
    const newField = event.target.value;
    setSelectedField((prev)=>(
      {
        field: newField,
        skills: prev.field===newField?prev.skills:[],
      }
    ));
  };

  const handleSkillChange = (skills) => {
    setSelectedField((prev) => ({
      ...prev,
      skills,
    }));
  };

  return (
    <Box className="skill-form">
      <Heading as="h1" size="lg" mb={6} textAlign="center" color="white">Select Student Skills</Heading>

      <FormControl mb={6}>
        <FormLabel htmlFor="field" color="white" fontWeight="bold">Choose a field:</FormLabel>
        <Select id="field" placeholder="Select a field" value={selectedField.field} onChange={handleFieldChange} color="white" bg="white" borderColor="white">
          {Object.keys(fields).map(field => (
            <option key={field} value={field} style={{ color: 'black' }}>{field}</option>
          ))}
        </Select>
      </FormControl>

      {selectedField.field && (
        <FormControl mb={6}>
          <FormLabel color="white" fontWeight="bold">Choose skills from {selectedField.field}:</FormLabel>
          <CheckboxGroup onChange={handleSkillChange} value={selectedField.skills}>
            <Stack spacing={2} color={"white"}>
              {fields[selectedField.field].map(skill => (
                <Checkbox key={skill} value={skill} colorScheme="whiteAlpha" color="white">
                  {skill}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </FormControl>
      )}

      <Box mt={6}>
        <Heading as="h2" size="md" mb={2} color="white">Selected Skills:</Heading>
        <ul className="selected-skills-list">
          {selectedField.skills.map(skill => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </Box>
      <Button className='apply-button' onClick={handleApply}>Add Skills</Button>

      <Box mt={6}>
        <Heading as="h2" size="md" mb={2} color="white">My Skills:</Heading>
        {mySkills && Object.entries(mySkills).map(([field, skills]) => (
          <Box key={field} mb={4}>
            <Heading as="h3" size="sm" color="white">{field}</Heading>
            <Box pl={4}>
              {skills.map(skill => (
                <Box key={skill} color="white">{skill}</Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SkillForm;
