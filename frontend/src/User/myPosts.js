import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import {
  Chat as ChatIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
} from "@mui/icons-material";
import DropdownMenu from "../shared/components/HamburgerDropdown";
import { fetchMyPosts } from "../store/slices/postSlice";
import "../styles/posts.css";
import CreatePost from "./createPost";
import CommentTextsection from "../shared/components/CommentTextSection";

const MyPost = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [showTextSection, setShowTextSection] = useState({});
  const dispatch = useDispatch();
  const myPosts = useSelector((state) => state.posts.myPosts);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    dispatch(fetchMyPosts());
  }, [dispatch]);

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
    setLikes((prevState) => ({
      ...prevState,
      [postId]: (prevState[postId] || 0) + (likes[postId] ? -1 : 1),
    }));
  };

  return (
    <div className="posts-page">
      <Button
        className="create-post-button"
        onClick={handleShowCreatePost}
      >
        Create Post
      </Button>

      <div className="posts">
        {myPosts && myPosts.length > 0 ? (
          myPosts.map((post) => (
            <div key={post._id} className="post">
              <div className="post-owner">
                <Avatar
                  src={post.author.avatar.filePath}
                  alt={post.author.name}
                  sx={{ width: 56, height: 56 }}
                />
                <div className="username">
                  <Typography variant="subtitle1">
                    {post.author.name}
                  </Typography>
                </div>
                <DropdownMenu postId={post._id} userEmail={post.author.email} />
              </div>
              <div className="post-content">
                <Typography variant="body1">{post.text}</Typography>
              </div>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }} className="post-actions">
                <IconButton onClick={() => handleToggleLike(post._id)} className="like-button">
                  <ThumbUpIcon color={likes[post._id] ? "primary" : "action"} />
                </IconButton>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {likes[post._id] || 0}
                </Typography>
                <IconButton onClick={() => handleToggleTextSection(post._id)} className="comment-button">
                  <ChatIcon />
                </IconButton>
              </Box>
              {post.images &&
                post.images.map((image, index) => (
                  <Box key={index} sx={{ mt: 1 }}>
                    <img
                      src={image}
                      alt="Sample"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </Box>
                ))}
              {showTextSection[post._id] && (
                <CommentTextsection
                  setShowThis={() => handleToggleTextSection(post._id)}
                />
              )}
            </div>
          ))
        ) : (
          <Typography variant="body2" sx={{ mt: 2 }}>
            No posts available.
          </Typography>
        )}
      </div>

      <CreatePost
        showModal={showModal}
        handleShowCreatePost={handleShowCreatePost}
      />
    </div>
  );
};

export default MyPost;
