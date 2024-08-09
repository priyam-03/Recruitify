import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/posts.css';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';
import CteatepostTextsection from '../shared/components/CreatepostTextSection';
import { fetchPosts } from '../store/slices/postSlice';
import DropdownMenu from '../shared/components/HamburgerDropdown';
import { Avatar, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentTextsection from '../shared/components/CommentTextSection';
import usePostChange from './IsChange';
const Posts = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [showModal, setShowModal] = useState(false);
    const [showTextSection, setShowTextSection] = useState({});
    const dispatch = useDispatch();
    let state = useSelector((state) => state);
    const [likes, setLikes] = useState({});
    const [likeMode, setLikeMode] = useState({});
    const [isChanged,triggerChange] = usePostChange();
    useEffect(() => {
        dispatch(fetchPosts(userInfo.user.email));
    }, [isChanged]);

    const handleShowCreatePost = () => {
        setShowModal(!showModal);
    };

    const handleToggleTextSection = (postId) => {
        setShowTextSection((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };

    const handleToggleLike = (postId) => {
        setLikes((prevState) => {
            const newLikes = { ...prevState };
            const isLiked = likeMode[postId];

            if (isLiked) {
                newLikes[postId] = Math.max(0, (newLikes[postId] || 0) - 1);
            } else {
                newLikes[postId] = (newLikes[postId] || 0) + 1;
            }

            return newLikes;
        });
        setLikeMode((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    }

    return (
        <div className="posts-page">
            <div>
                <button className="create-post-button" onClick={handleShowCreatePost}>
                    Create Post
                </button>
            </div>
            <div className="posts">
                {state.posts.data && state.posts.data.map((post) => (
                    <div key={post._id} className="post">
                        <div className="post-owner">
                            <Avatar
                                src={post.author.avatar.filePath}
                                name={post.author.name}
                                size="sm"
                            />
                            <div className="username">{post.author.name}</div>
                            <DropdownMenu postId={post._id} userEmail={post.author.email} triggerChange={triggerChange}/>
                        </div>
                        <div className="post-content">{post.text}</div>
                        <Flex ml="5px" p="4px">
                            <Box
                                cursor="pointer"
                                ml="6px"
                                display="flex"
                                alignItems="center"
                            >
                                <ThumbUpIcon onClick={handleToggleLike}/>
                                <Text ml="2px">Like</Text>
                            </Box>
                            <Box
                                cursor="pointer"
                                ml="6px"
                                display="flex"
                                alignItems="center"
                            >
                                <ThumbDownIcon />
                                <Text ml="2px">Dislike</Text>
                            </Box>
                            <Box>
                                <Box
                                    ml="6px"
                                    cursor="pointer"
                                    display="flex"
                                    alignItems="center"
                                    onClick={() => handleToggleTextSection(post._id)}
                                >
                                    <ChatIcon />
                                    <Text ml="2px">Comment</Text>
                                </Box>
                                {post.images && post.images.map((image) => {
                                    <Box>
                                        <Image
                                            src={image}
                                            alt="Sample Image"
                                            boxSize="150px"
                                            objectFit="cover"
                                            borderRadius="full"
                                        />
                                    </Box>
                                })}
                            </Box>
                        </Flex>
                        {showTextSection[post._id] && (
                            <CommentTextsection
                                setShowThis={() => handleToggleTextSection(post._id)}
                            />
                        )}
                    </div>
                ))}
                <Text>No more Posts to show</Text>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <CloseIcon onClick={handleShowCreatePost} className="close-button" />
                        <br />
                        <CteatepostTextsection setShowThis={setShowModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Posts;
