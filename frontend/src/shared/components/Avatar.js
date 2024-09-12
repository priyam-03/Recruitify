import React from "react";
import { styled } from "@mui/system";

const AvatarPreview = styled("div")({
  height: "40px",
  width: "40px",
  backgroundColor: "#5865f2",
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

const Avatar = ({ avatar }) => {
  return (
    <AvatarPreview>
      <AvatarImage
        src='https://media.istockphoto.com/id/183821822/photo/say.jpg?s=612x612&w=0&k=20&c=kRmCjTzA9cq4amgRgeHkZsZuvxezUtC8wdDYfKg-mho='
        alt="avatar"
      />
    </AvatarPreview>
  );
};

export default Avatar;
