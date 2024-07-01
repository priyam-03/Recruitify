import { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Textarea,
    Heading,
    Flex,
} from '@chakra-ui/react';
import '../styles/education.css'; // Import the CSS file

const EducationForm = () => {
    const [educationInfo, setEducationInfo] = useState({
        school: 'BMHS',
        college: 'JU',
        specialization: 'CSE',
        cgpa: '7.7',
        otherInfo: 'N/A',
    });

    const [activeEdit,setActiveEdit] = useState(false);
    const toogleEditButton = () =>{
        setActiveEdit(!activeEdit);
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEducationInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(educationInfo);
        setEducationInfo({
            school: '',
            college: '',
            specialization: '',
            cgpa: '',
            otherInfo: '',
        });
    };

    return (
        <Box p={4} padding={5}>
            <Heading as="h2" size="lg" mb={4}>
                Education Information
            </Heading>
            <form onSubmit={handleSubmit} className='form'>
                <Stack spacing={4}>
                <Flex className='flex-container'> {!activeEdit && <button onClick={toogleEditButton} className='edit-button'>Edit</button>}</Flex>
                    <FormControl className='formcontrol'>
                        <Flex className='form-flex' flexDir={'row'}>
                            <FormLabel className='formlabel' >School</FormLabel>
                            <Input
                                className='input-box'
                                type="text"
                                placeholder="Enter Your School"
                                name="school"
                                value={educationInfo.school}
                                onChange={handleChange}
                            />
                        </Flex>
                    </FormControl>
                    <FormControl className='formcontrol'>
                        <Flex className='form-flex' flexDir={'row'}>
                            <FormLabel className='formlabel' >College</FormLabel>
                            <Input
                                className='input-box'
                                type="text"
                                placeholder="Enter Your College"
                                name="college"
                                value={educationInfo.college}
                                onChange={handleChange}
                            />
                        </Flex>
                    </FormControl>
                    <FormControl className='formcontrol'>
                        <Flex className='form-flex' flexDir={'row'}>
                            <FormLabel className='formlabel' >Specialization</FormLabel>
                            <Input
                                className='input-box'
                                type="text"
                                placeholder="Enter Your Specialization"
                                name="specialization"
                                value={educationInfo.specialization}
                                onChange={handleChange}
                            />
                        </Flex>
                    </FormControl>
                    <FormControl className='formcontrol'>
                        <Flex className='form-flex' flexDir={'row'}>
                            <FormLabel className='formlabel'>CGPA/Percentage</FormLabel>
                            <Input
                                className='input-box'
                                type="text"
                                placeholder="Enter Your CGPA/Percentage"
                                name="cgpa"
                                value={educationInfo.cgpa}
                                onChange={handleChange}
                            />
                        </Flex>
                    </FormControl>
                    <FormControl className='formcontrol'>
                        <Flex className='form-flex' flexDir={'row'}>
                            <FormLabel className='formlabel'>Other Information</FormLabel>
                            <Textarea
                                className='input-box'
                                placeholder="Enter any other information"
                                name="otherInfo"
                                value={educationInfo.otherInfo}
                                onChange={handleChange}
                            />
                        </Flex>
                    </FormControl>
                    <Flex className='flex-container'>{activeEdit && <button onClick={toogleEditButton} className='save-button'>Apply Changes</button>}</Flex>
                </Stack>
            </form>
        </Box>
    );
};

export default EducationForm;
