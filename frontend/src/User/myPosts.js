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
import styles from "../styles/post.module.css";
import CreatePost from "./createPost";
import CommentTextsection from "../shared/components/CommentTextSection";
import Error from "../shared/components/Error";
import { Fade } from "react-awesome-reveal";

const MyPost = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [showTextSection, setShowTextSection] = useState({});
  const dispatch = useDispatch();
  const myPosts = useSelector((state) => state.posts.myPosts);
  const errorMessage = useSelector((state) => state.posts.errorMessage);
  const [likes, setLikes] = useState({});
  const [likeMode, setLikeMode] = useState({});

  const [postLikeList, setPostLikeList] = useState({});
  const [isCommentActive, setIsCommentActive] = useState({});
  useEffect(() => {
    dispatch(fetchMyPosts());
  }, [dispatch]);
  console.log(myPosts);
  const handleShowCreatePost = () => {
    setShowModal(!showModal);
  };

  const handleToggleTextSection = (postId) => {
    setIsCommentActive((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
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

  return (
    <div className={styles.posts_page}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleShowCreatePost}
      >
        Create Post
      </Button>

      <div className="posts">
        {myPosts && myPosts.length > 0 ? (
          myPosts.map((post) => (
            // <div key={post._id} className={styles.post}>
            //   <div className={styles.post_owner}>
            //     <Avatar
            //       src={post.author.avatar.filePath}
            //       alt={post.author.name}
            //       sx={{ width: 56, height: 56 }}
            //     />
            //     <div className={styles.username}>
            //       <Typography variant="subtitle1">
            //         {post.author.name}
            //       </Typography>
            //     </div>
            //     <DropdownMenu postId={post._id} userEmail={post.author.email} />
            //   </div>
            //   <div className="post-content">
            //     <Typography variant="body1">{post.text}</Typography>
            //   </div>
            //   <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            //     <IconButton onClick={() => handleToggleLike(post._id)}>
            //       <ThumbUpIcon
            //         color={likeMode[post._id] ? "primary" : "action"}
            //       />
            //     </IconButton>
            //     <Typography variant="body2" sx={{ ml: 1 }}>
            //       {likes[post._id] || 0}
            //     </Typography>
            //     <IconButton onClick={() => handleToggleLike(post._id)}>
            //       <ThumbDownIcon />
            //     </IconButton>
            //     <IconButton onClick={() => handleToggleTextSection(post._id)}>
            //       <ChatIcon />
            //     </IconButton>
            //   </Box>
            //   {post.images &&
            //     post.images.map((image, index) => (
            //       <Box key={index} sx={{ mt: 1 }}>
            //         <img
            //           src={image}
            //           alt="Sample"
            //           style={{
            //             width: "150px",
            //             height: "150px",
            //             objectFit: "cover",
            //             borderRadius: "8px",
            //           }}
            //         />
            //       </Box>
            //     ))}
            //   {showTextSection[post._id] && (
            //     <CommentTextsection
            //       setShowThis={() => handleToggleTextSection(post._id)}
            //     />
            //   )}
            // </div>
            <Fade cascade up fraction={0.2} triggerOnce>
              <div key={post._id} className={styles.post}>
                <div className={styles.post_owner}>
                  <Avatar
                    src={post.author.avatar.filePath}
                    alt={post.author.name}
                    sx={{ width: 56, height: 56 }} // Make sure this is consistent with CSS
                  />
                  <div className={styles.username}>
                    <Typography
                      variant="subtitle1"
                      className={styles.post_owner_username}
                    >
                      {post.author.name}
                    </Typography>
                  </div>
                  <DropdownMenu
                    postId={post._id}
                    userEmail={post.author.email}
                  />
                </div>
                <div className={styles.post_content}>
                  <Typography variant="body1" className={styles.post_text}>
                    {post.text}
                  </Typography>
                </div>
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
                <Box
                  sx={{ display: "flex", alignItems: "center", mt: 1 }}
                  className={styles.post_actions}
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
                    className={`${styles.like_button} ${
                      postLikeList[post._id] == 1 ? styles.active : ""
                    }`}
                  >
                    <ThumbUpIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => handleToggleLike(post._id, -1)}
                    className={`${styles.dislike_button} ${
                      postLikeList[post._id] == -1 ? styles.active : ""
                    }`}
                  >
                    <ThumbDownIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleToggleTextSection(post._id)}
                    className={`${styles.comment_button} ${
                      isCommentActive[post._id] == 1 ? styles.active : ""
                    }`}
                  >
                    <ChatIcon />
                  </IconButton>
                </Box>
                {showTextSection[post._id] && (
                  <CommentTextsection
                    setShowThis={() => handleToggleTextSection(post._id)}
                  />
                )}
              </div>
            </Fade>
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
