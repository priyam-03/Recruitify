import { FormControl, FormLabel, Input, Select, Flex, Box, Button, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import '../styles/links.css';
import { useDispatch, useSelector } from "react-redux";
import { addLink, fetchLinks } from "../store/slices/profileSlices";

const LinkForm = () => {
    const fields = ['github', 'linkedIn'];
    const links = useSelector((state) => state.profile.links);
    const dispatch = useDispatch();
    const [newLink, setNewLink] = useState({
        field: '',
        link: '',
    });

    useEffect(() => {
        dispatch(fetchLinks()); // Fetch links instead of skills
    }, [dispatch]);

    const handleFieldChange = (event) => {
        const newField = event.target.value;
        setNewLink((prev) => ({
            ...prev,
            field: newField,
        }));
    };

    const handleUrlChange = (event) => {
        const newLinkValue = event.target.value;
        setNewLink((prev) => ({
            ...prev,
            link: newLinkValue,
        }));
    };

    const handleAddLink = () => {
        dispatch(addLink(newLink));
        setNewLink({ field: '', link: '' });
    };

    return (
        <div>
            <Box className='links-form'>
                <FormControl>
                    <FormLabel className="form-label">Choose a field</FormLabel>
                    <Select
                        id="field"
                        placeholder="Select a field"
                        value={newLink.field}
                        onChange={handleFieldChange}
                        bg={"#083057"}
                    >
                        {fields.map((field) => (
                            <option key={field} value={field} style={{ color: 'black' }}>
                                {field}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box className='links-form'>
                <FormControl className='form-control'>
                    <Flex className='form-flex' flexDir="row">
                        <FormLabel className='form-label'>{newLink.field.toUpperCase()}</FormLabel>
                        <Input
                            className='input-box'
                            type="url"
                            isRequired
                            placeholder="Enter the link"
                            value={newLink.link}
                            onChange={handleUrlChange}
                        />
                    </Flex>
                </FormControl>
            </Box>
            <Button onClick={handleAddLink} colorScheme="blue" mt="4">Add Link</Button>

            <Box mt="6">
                <Flex flexDir="row" justifyContent="center" cursor={"pointer"}>
                    {links.length > 0 && links.map((linkItem, index) => (
                        <Box key={index} width="40px" height="40px" margin={"20px"}>
                            <a href={linkItem.link} target="_blank" rel="noopener noreferrer">
                                <Image
                                    src={linkItem.field === 'github' ? 'https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png' : 'https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png'}
                                    width="60px"
                                    height="60px"
                                    borderRadius={"30px"}
                                />
                            </a>
                        </Box>
                    ))}
                </Flex>
            </Box>
        </div>
    );
};

export default LinkForm;
