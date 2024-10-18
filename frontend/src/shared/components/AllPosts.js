import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { Chat as ChatIcon, ThumbUp as ThumbUpIcon, ThumbDown as ThumbDownIcon } from '@mui/icons-material';
import DropdownMenu from './HamburgerDropdown';
import { fetchAllPosts } from '../../store/slices/postSlice';
import '../../styles/posts.css';
import CommentTextsection from './CommentTextSection';

const AllPost = () => {
    const dispatch = useDispatch();
    const allPosts = useSelector((state) => state.posts.allPosts);
    const [likes, setLikes] = useState({});
    const [likeMode, setLikeMode] = useState({});
    const [showTextSection, setShowTextSection] = useState({});

    useEffect(() => {
        dispatch(fetchAllPosts());
    }, [dispatch]);

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
    };

    const { userInfo } = useSelector((state) => state.auth);

    return (
        <div className="posts-page">
            <div className="posts">
                {allPosts && allPosts.map((post) => (
                    post && post.author ? ( // Check if post and post.author exist
                        <div key={post._id} className="post">
                            <div className="post-owner">
                                <Avatar
                                    src={post.author.avatar.filePath}
                                    alt={post.author.name}
                                    sx={{ width: 56, height: 56 }} // Make sure this is consistent with CSS
                                />
                                <div className="username">
                                    <Typography variant="subtitle1" className="post-owner-username">{post.author.name}</Typography>
                                </div>
                                <DropdownMenu postId={post._id} userEmail={post.author.email} />
                            </div>
                            <div className="post-content">
                                <Typography variant="body1">{post.text}</Typography>
                            </div>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }} className="post-actions">
                                <IconButton onClick={() => handleToggleLike(post._id)} className="like-button">
                                    <ThumbUpIcon  />
                                </IconButton>
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                    {likes[post._id] || 0}
                                </Typography>
                                <IconButton onClick={() => handleToggleLike(post._id)} className="dislike-button">
                                    <ThumbDownIcon />
                                </IconButton>
                                <IconButton onClick={() => handleToggleTextSection(post._id)} className="comment-button">
                                    <ChatIcon />
                                </IconButton>
                            </Box>
                            {post.images && post.images.map((image, index) => (
                                <Box key={index} sx={{ mt: 1 }}>
                                    <img
                                        src={image}
                                        alt="Sample"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                                    />
                                </Box>
                            ))}
                            {showTextSection[post._id] && (
                                <CommentTextsection
                                    setShowThis={() => handleToggleTextSection(post._id)}
                                />
                            )}
                        </div>
                    ) : null // Render nothing if post or post.author is missing
                ))}
                <Typography variant="body2">No more Posts to show</Typography>
            </div>
        </div>
    );
};

export default AllPost;
