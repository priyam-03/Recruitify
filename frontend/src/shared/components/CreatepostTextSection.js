import { useRef, useState } from 'react';
import { Box, Flex, Image, Textarea, Button } from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'; // Add emoji icon
import '../../styles/TextSection.css';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/slices/postSlice';
import DeleteIcon from '@mui/icons-material/Delete';

const CreatepostTextsection = ({ setShowThis }) => {
    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);
    const [texts, setTexts] = useState('');
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    const handleAttachClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImages([...images, imageUrl]);
        }
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const handleText = (texts) => {
        setTexts(texts);
    };

    const handleCreatePost = () => {
        if (images.length > 0 || texts.trim()) {
            const content = { texts, images };
            dispatch(createPost({
                user: userInfo.user.email,
                content: content,
            }));
            setShowThis(false);
        }
    };

    const isPostDisabled = texts.trim().length===0 && images.length === 0;

    return (
        <div>
            <div className='imgholder'>
                {images.length !== 0 && (
                    <Flex flexWrap="wrap" mt={4}>
                        {images.map((image, index) => (
                            <Box key={index} position="relative" mr={8} mb={2} className="image-wrapper">
                                <Image src={image} alt={`Image-${index}`} boxSize="80px" borderRadius="md" className="image" />
                                <div className="overlay" onClick={() => handleRemoveImage(index)}>
                                    <DeleteIcon className="delete-icon" />
                                </div>
                            </Box>
                        ))}
                    </Flex>
                )}
            </div>

            <div className='input-bar'>
            <Textarea
                placeholder="Write what you want..."
                onChange={(e) => handleText(e.target.value)}
                resize="none"
                rows={12}
                backgroundColor={'#3F3F3F'}
                color={'white'}
                maxH="500px"
                fontSize={'14px'}
                overflowY="auto"
                className="post-input"
                width="95%" // Full width
                p={12}
                _focus={{
                    borderColor: 'white', // Set the border color to white on focus
                    outline: 'none',      // Remove default outline
                    boxShadow: '0 0 0 1px white', // Optional: create a subtle glow effect
                }}
            />


                <hr className="separator-line" /> {/* Horizontal line */}

                <Flex alignItems="center" justifyContent="space-between" mt={2} >
                    <Flex alignItems="center">
                        <AttachmentIcon boxSize={20} cursor={'pointer'} onClick={handleAttachClick} />
                        <EmojiEmotionsIcon boxSize={5} cursor={'pointer'} style={{ marginLeft: '18px' }} />
                        {/* Add more icons here if needed */}
                    </Flex>

                    <Button
                    onClick={handleCreatePost}
                    isDisabled={isPostDisabled}
                    sx={{
                        backgroundColor: isPostDisabled ? 'gray.200' : 'blue.500',
                        color: isPostDisabled ? 'gray.500' : 'white',
                        opacity: isPostDisabled ? 0.6 : 1, // To give a disabled effect
                        cursor: isPostDisabled ? 'not-allowed' : 'pointer',
                        _hover: {
                            backgroundColor: isPostDisabled ? 'gray.200' : 'blue.600',
                        },
                        _active: {
                            backgroundColor: isPostDisabled ? 'gray.200' : 'blue.700',
                        },
                    }}
                >
                    Post
                </Button>

                </Flex>

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                    multiple
                />
            </div>
        </div>
    );
}

export default CreatepostTextsection;
