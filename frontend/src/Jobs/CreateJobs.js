import React, { useState } from "react";
import { Box, Button, Checkbox, CheckboxGroup, Flex, FormControl, Heading, FormLabel, Input, Stack, Textarea } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { createJobForms } from "../store/slices/JobSlices";

const CreateJob = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [selectedFields, setSelectedFields] = useState([]);
    const [userDetails, setUserDetails] = useState({
        name: { isSelected: false, isRequired: false },
        email: { isSelected: false, isRequired: false },
        address: { isSelected: false, isRequired: false },
        contactNo: { isSelected: false, isRequired: false },
        institution: { isSelected: false, isRequired: false },
        rollNo: { isSelected: false, isRequired: false },
        cgpaOrPercentage: { isSelected: false, isRequired: false },
        yearOfGraduation: { isSelected: false, isRequired: false },
        resume: { isSelected: false, isRequired: false },
    });
    const [showPreview, setShowPreview] = useState(false);

    const fields = ['name', 'email', 'address', 'contactNo', 'institution', 'rollNo', 'cgpaOrPercentage', 'yearOfGraduation', 'resume'];

    const [jobApplication, setJobApplication] = useState({
        jobRole: '',
        jobDescription: '',
        userDetails: {},
    });

    const handleFieldChange = (fields) => {
        setSelectedFields(fields);
        setUserDetails(prev => {
            const updatedDetails = { ...prev };
            fields.forEach(field => {
                updatedDetails[field].isSelected = true;
            });
            Object.keys(updatedDetails).forEach(field => {
                if (!fields.includes(field)) {
                    updatedDetails[field].isSelected = false;
                }
            });
            return updatedDetails;
        });
    };

    const handleJobChange = (event) => {
        const { name, value } = event.target;
        setJobApplication(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleToggleRequired = (field) => {
        setUserDetails(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                isRequired: !prev[field].isRequired,
            },
        }));
    };

    const handleDetailChange = (field) => {
        if (userDetails[field].isSelected === true)
            handleToggleRequired(field);
    };

    const handleSubmit = () => {
        try {
            if (!jobApplication.jobRole || !jobApplication.jobDescription) return;

            const updatedJobApplication = {
                ...jobApplication,
                userDetails,
            };

            dispatch(createJobForms({
                user: userInfo.user.email,
                content: updatedJobApplication,
            }));
            setJobApplication(() => (
                {
                    jobRole: '',
                    jobDescription: '',
                    jobDescription: {}
                }
            ))

            setShowPreview(false);
        } catch (error) {
            console.error("An error occurred while submitting the job application:", error);
        }
    };


    return (
        <Box overflowY="auto" height="100vh" padding="10px">
            <div>
                {!showPreview && (
                    <>
                        <FormControl>
                            <FormLabel color="white" marginBottom="10px">Job Role</FormLabel>
                            <Input
                                type="text"
                                name="jobRole"
                                value={jobApplication.jobRole || ''}
                                onChange={handleJobChange}
                                required
                                width="90%"
                                fontSize="20px"
                                bg="white"
                                border="none"
                                padding="5px"
                                borderColor="white"
                                borderRadius="5px"
                                overflowX="auto"
                                overflowY="hidden"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel color="white" marginBottom="10px">Description</FormLabel>
                            <Textarea
                                type="text"
                                name="jobDescription"
                                value={jobApplication.jobDescription || ''}
                                onChange={handleJobChange}
                                required
                                width="90%"
                                fontSize="20px"
                                bg="white"
                                border="none"
                                borderRadius="5px"
                                rows={3}
                                padding="5px"
                                overflowY="auto"
                                overflowX="hidden"
                            />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel color="white">Select User Details for Your Job Application</FormLabel>
                            <CheckboxGroup value={selectedFields} onChange={handleFieldChange}>
                                <Stack>
                                    {fields.map(field => (
                                        <Flex key={field} flexDir="row" alignItems="center" justifyContent="space-between">
                                            <Checkbox value={field} color="white">
                                                {field}
                                            </Checkbox>
                                            <Button
                                                height="20px"
                                                fontSize="13px"
                                                width="auto"
                                                variant="ghost"
                                                colorScheme={userDetails[field].isRequired ? "red" : "blue"}
                                                ml={2}
                                                onClick={() => handleDetailChange(field)}
                                            >
                                                {userDetails[field].isRequired ? 'undo' : 'required'}
                                            </Button>
                                        </Flex>
                                    ))}
                                </Stack>
                            </CheckboxGroup>
                        </FormControl>
                        <Flex justifyContent="center" mt="4">
                            {!showPreview && (
                                <Button onClick={() => setShowPreview(true)}>
                                    Preview Job
                                </Button>
                            )}
                        </Flex>
                    </>
                )}
                {showPreview && (
                    <Box>
                        <Heading size="md" color="white" mb="4">Preview Job</Heading>
                        <FormControl>
                            <FormLabel color="white" marginBottom="10px">Job Role</FormLabel>
                            <Input
                                type="text"
                                name="jobRole"
                                value={jobApplication.jobRole || ''}
                                readOnly
                                width="90%"
                                fontSize="20px"
                                bg="white"
                                border="none"
                                padding="5px"
                                borderColor="white"
                                borderRadius="5px"
                                overflowX="auto"
                                overflowY="hidden"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel color="white" marginBottom="10px">Description</FormLabel>
                            <Textarea
                                type="text"
                                name="jobDescription"
                                value={jobApplication.jobDescription || ''}
                                readOnly
                                width="90%"
                                fontSize="20px"
                                bg="white"
                                border="none"
                                borderRadius="5px"
                                rows={3}
                                padding="5px"
                                overflowY="auto"
                                overflowX="hidden"
                            />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel color="white">User Details</FormLabel>
                            <Stack>
                                {fields.map(field => (
                                    userDetails[field].isSelected && (
                                        <Flex key={field} flexDir="row" alignItems="center" justifyContent="space-between">
                                            <FormLabel color="white" width="30%">
                                                {field}{userDetails[field].isRequired && ' *'}
                                            </FormLabel>
                                            <Input
                                                type="text"
                                                value={userDetails[field].isRequired ? "Required" : "Optional"}
                                                readOnly
                                                width="60%"
                                                fontSize="20px"
                                                bg="white"
                                                border="none"
                                                padding="5px"
                                                borderColor="white"
                                                borderRadius="5px"
                                            />
                                        </Flex>
                                    )
                                ))}
                            </Stack>
                        </FormControl>
                        <Flex justifyContent="center" mt="4">
                            <Button onClick={handleSubmit}>
                                Confirm
                            </Button>
                            <Button onClick={() => setShowPreview(false)} ml="4">
                                Edit
                            </Button>
                        </Flex>
                    </Box>
                )}
            </div>
        </Box>
    );
};

export default CreateJob;
