import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import {
  Chat as ChatIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
} from "@mui/icons-material";
import DropdownMenu from "./HamburgerDropdown";
import { fetchAllPosts } from "../../store/slices/postSlice";
import "../../styles/posts.css";
import CommentTextsection from "./CommentTextSection";

import { Fade } from "react-awesome-reveal";
const AllPost = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts.allPosts);
  const [likes, setLikes] = useState({});

  const [showTextSection, setShowTextSection] = useState({});
  const [likeMode, setLikeMode] = useState({});
  //   to Hold likes and dislikes for a post
  const [postLikeList, setPostLikeList] = useState({});
  const [isCommentActive, setIsCommentActive] = useState(false);
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  const handleToggleTextSection = (postId) => {
    setIsCommentActive(!isCommentActive);
    setShowTextSection((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const handleToggleLike = (postId, like = 0) => {
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
    setPostLikeList((prevState) => {
      const PostLikes = { ...prevState };
      if (PostLikes[postId] == like) {
        PostLikes[postId] = 0;
      } else {
        PostLikes[postId] = like;
      }
      return PostLikes;
    });
    setLikeMode((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="posts-page">
      <div className="posts">
        {allPosts &&
          allPosts.map(
            (post) =>
              post && post.author ? ( // Check if post and post.author exist
                <Fade cascade up fraction={0.2} triggerOnce>
                  <div key={post._id} className="post">
                    <div className="post-owner">
                      <Avatar
                        src={post.author.avatar.filePath}
                        alt={post.author.name}
                        sx={{ width: 56, height: 56 }} // Make sure this is consistent with CSS
                      />
                      <div className="username">
                        <Typography
                          variant="subtitle1"
                          className="post-owner-username"
                        >
                          {post.author.name}
                        </Typography>
                      </div>
                      <DropdownMenu
                        postId={post._id}
                        userEmail={post.author.email}
                      />
                    </div>
                    <div className="post-content">
                      <Typography variant="body1" className="post-text">
                        {post.text}
                      </Typography>
                    </div>
                    <Box
                      sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      className="post-actions"
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          ml: 1,
                          mt: 1,
                          mr: 1,
                          fontSize: 16,
                          color: "rgb(198, 198, 198)",
                        }}
                      >
                        {likes[post._id] || 0}
                      </Typography>
                      <IconButton
                        onClick={(e) => handleToggleLike(post._id, 1)}
                        className={
                          "like-button " +
                          (postLikeList[post._id] == 1 ? "active" : "")
                        }
                      >
                        <ThumbUpIcon />
                      </IconButton>

                      <IconButton
                        onClick={() => handleToggleLike(post._id, -1)}
                        className={
                          "dislike-button " +
                          (postLikeList[post._id] == -1 ? "active" : "")
                        }
                      >
                        <ThumbDownIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleToggleTextSection(post._id)}
                        className={
                          "comment-button " + (isCommentActive ? "active" : "")
                        }
                      >
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
                </Fade>
              ) : null // Render nothing if post or post.author is missing
          )}
        <Typography variant="body2">No more Posts to show</Typography>
      </div>
    </div>
  );
};

export default AllPost;
