import { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Heading,
    Flex,
    VStack
} from '@chakra-ui/react';
import '../styles/experience.css'; // Import the CSS file

const ExperienceForm = () => {
    const [experiences, setExperiences] = useState([{
        company: 'JU',
        role: 'student',
        yearOfExperience: '3'
    }]);
    const [newExperience, setNewExperience] = useState({
        company: '',
        role: '',
        yearOfExperience: ''
    });

    const [editIndex, setEditIndex] = useState(null);
    const [editedExperience, setEditedExperience] = useState({
        company: '',
        role: '',
        yearOfExperience: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewExperience({
            ...newExperience,
            [name]: value,
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedExperience({
            ...editedExperience,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setExperiences([...experiences, newExperience]);
        setNewExperience({ company: '', role: '', yearOfExperience: '' });
    };

    const handleEditClick = (index) => {
        setEditIndex(index);
        setEditedExperience(experiences[index]);
    };

    const handleSaveClick = (index) => {
        const updatedExperiences = experiences.map((exp, i) =>
            i === index ? editedExperience : exp
        );
        setExperiences(updatedExperiences);
        setEditIndex(null);
    };

    return (
        <Box p={4}>
            <Heading as="h2" size="lg" mb={4}>
                Add New Experience
            </Heading>
            <form onSubmit={handleSubmit} className="form">
                <VStack spacing={4}>
                    <FormControl className='formcontrol'>
                        <Flex className='form-flex' flexDir="row">
                            <FormLabel className='formlabel'>Company</FormLabel>
                            <Input
                                className='input-box'
                                type="text"
                                isRequired="true"
                                placeholder="Enter Company"
                                name="company"
                                value={newExperience.company}
                                onChange={handleChange}
                            />
                        </Flex>
                    </FormControl>
                    <FormControl className='formcontrol'>
                        <Flex className='form-flex' flexDir="row">
                            <FormLabel className='formlabel'>Role</FormLabel>
                            <Input
                                className='input-box'
                                type="text"
                                isRequired="true"
                                placeholder="Enter Role"
                                name="role"
                                value={newExperience.role}
                                onChange={handleChange}
                            />
                        </Flex>
                    </FormControl>
                    <FormControl className='formcontrol'>
                        <Flex className='form-flex' flexDir="row">
                            <FormLabel className='formlabel'>Year of Experience</FormLabel>
                            <Input
                                className='input-box'
                                type="text"
                                isRequired="true"
                                placeholder="Enter Years of Experience"
                                name="yearOfExperience"
                                value={newExperience.yearOfExperience}
                                onChange={handleChange}
                            />
                        </Flex>
                    </FormControl>
                    <Button type="submit" className="submit-button">
                        Add Experience
                    </Button>
                </VStack>
            </form>
            <Heading as="h3" size="md" mt={8} mb={4}>
                Experience List
            </Heading>
            {experiences.map((experience, index) => (
                <Box key={index} className="experience-box">
                    {editIndex === index ? (
                        <>
                            <FormControl className='formcontrol'>
                                <Flex className='form-flex' flexDir="row">
                                    <FormLabel className='formlabel'>Company</FormLabel>
                                    <Input
                                        className='input-box'
                                        type="text"
                                        isRequired="true"
                                        name="company"
                                        value={editedExperience.company}
                                        onChange={handleEditChange}
                                    />
                                </Flex>
                            </FormControl>
                            <FormControl className='formcontrol'>
                                <Flex className='form-flex' flexDir="row">
                                    <FormLabel className='formlabel'>Role</FormLabel>
                                    <Input
                                        className='input-box'
                                        type="text"
                                        isRequired="true"
                                        name="role"
                                        value={editedExperience.role}
                                        onChange={handleEditChange}
                                    />
                                </Flex>
                            </FormControl>
                            <FormControl className='formcontrol'>
                                <Flex className='form-flex' flexDir="row">
                                    <FormLabel className='formlabel'>Year of Experience</FormLabel>
                                    <Input
                                        className='input-box'
                                        type="text"
                                        isRequired="true"
                                        name="yearOfExperience"
                                        value={editedExperience.yearOfExperience}
                                        onChange={handleEditChange}
                                    />
                                </Flex>
                            </FormControl>
                            <Flex className='flex-container'>
                                <Button onClick={() => handleSaveClick(index)} className='save-button'>
                                    Save
                                </Button>
                            </Flex>
                        </>
                    ) : (
                        <>
                            <Flex className='flex-container'>
                                <Button onClick={() => handleEditClick(index)} className='edit-button'>
                                    Edit
                                </Button>
                            </Flex>
                            <FormControl className='formcontrol'>
                                <Flex className='form-flex' flexDir="row">
                                    <FormLabel className='formlabel'>Company</FormLabel>
                                    <Input
                                        className='input-box'
                                        type="text"
                                        value={experience.company}
                                        isReadOnly
                                    />
                                </Flex>
                            </FormControl>
                            <FormControl className='formcontrol'>
                                <Flex className='form-flex' flexDir="row">
                                    <FormLabel className='formlabel'>Role</FormLabel>
                                    <Input
                                        className='input-box'
                                        type="text"
                                        value={experience.role}
                                        isReadOnly
                                    />
                                </Flex>
                            </FormControl>
                            <FormControl className='formcontrol'>
                                <Flex className='form-flex' flexDir="row">
                                    <FormLabel className='formlabel'>Year of Experience</FormLabel>
                                    <Input
                                        className='input-box'
                                        type="text"
                                        value={experience.yearOfExperience}
                                        isReadOnly
                                    />
                                </Flex>
                            </FormControl>
                        </>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default ExperienceForm;
