import React from "react";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";

// Styled components for the avatar container and image
const AvatarPreview = styled("div")({
  height: "40px",
  width: "40px",
  cursor:"pointer",
  // backgroundColor: "",
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  fontWeight: "700",
  marginLeft: "5px",
  color: "white",
  overflow: "hidden", // Hide overflow to ensure the image does not go outside the container
});

const AvatarImage = styled("img")({
  height: "100%", // Make the image take up the full height of the container
  width: "100%", // Make the image take up the full width of the container
  objectFit: "cover", // Ensure the image covers the container without distortion
});

// Fallback avatar image in case of failure
const fallbackAvatar = "https://via.placeholder.com/40"; // You can change this to any fallback image URL

const Avatar = ({onClick}) => {
  const { userInfo } = useSelector((state) => state.auth);

  // Derive avatar source URL
  const avatarSrc = userInfo?.user?.avatar?.filePath
    ? `${process.env.REACT_APP_BACKEND_URL}/${userInfo.user.avatar.filePath}`
    : "https://plus.unsplash.com/premium_vector-1721131162397-943dc390c744?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  // Extract user's initials from the name for fallback content (if available)
  const getUserInitials = () => {
    if (userInfo?.user?.name) {
      const nameParts = userInfo.user.name.split(" ");
      const initials = nameParts.map((part) => part[0]).join("");
      return initials.toUpperCase();
    }
    return "U"; // Default if no name is available
  };

  return (
    <AvatarPreview onClick={onClick}>
      {/* Image tag with error handling */}
      <AvatarImage
        src={avatarSrc}
        alt="avatar"
        onError={(e) => {
          // Handle image load failure by switching to fallback avatar or user initials
          e.target.onerror = null; // Prevent infinite loop if fallback fails
          e.target.src = "/ppic.jpg"; // Set fallback avatar image
        }}
      />
    </AvatarPreview>
  );
};

export default Avatar;
