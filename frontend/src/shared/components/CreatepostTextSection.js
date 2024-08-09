import { useRef, useState } from 'react';
import { Box, CloseButton, Flex, Image, Input, Text } from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import SendIcon from '@mui/icons-material/Send';
import '../../styles/TextSection.css';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/slices/postSlice';
const CteatepostTextsection = ({ setShowThis}) => {
    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);
    const [texts, setTexts] = useState(null);
    const [content, setContent] = useState(null);
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
    }

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


    return (
        <div>
            <div className='text-box'>
                <div className="written-text">
                    {texts}
                </div>
            </div>

            <div>
                {images.length !== 0 &&
                    <Flex flexWrap="wrap" mt={4}>
                        {images.map((image, index) => (
                            <Box key={index} position="relative" mr={3} mb={2}>
                                <Image src={image} alt={`Image-${index}`} boxSize="80px" borderRadius="md" />
                                <CloseButton
                                    position="absolute"
                                    top="-4px"
                                    right="-4px"
                                    size="2px"
                                    onClick={() => handleRemoveImage(index)}
                                    bg="red.500"
                                    _hover={{ bg: 'red.600' }}
                                />
                            </Box>
                        ))}
                    </Flex>
                }
            </div>

            <div className='input-bar'>

                <div className="create-post-attachment">
                    <Flex mt={4} align="center" onClick={handleAttachClick} cursor="pointer">
                        <AttachmentIcon boxSize={20} mr={2} cursor={'pointer'} />
                        <input
                            className=''
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />
                    </Flex>
                </div>
                <div className="create-post-text">
                    <form className="create-post-form">
                        <input placeholder="Write what you want" type="text" onChange={(e) => { handleText(e.target.value) }} />
                    </form>
                </div>
                <SendIcon ml={5} cursor={'pointer'} onClick={handleCreatePost} />
            </div>
        </div>
    )
}

export default CteatepostTextsection;