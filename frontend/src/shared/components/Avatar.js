import React from "react";
import { styled } from "@mui/system";

const AvatarPreview = styled("div")({
  height: "42px",
  width: "42px",
  backgroundColor: "#5865f2",
  borderRadius: "42px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  fontWeight: "700",
  marginLeft: "5px",
  color: "white",
});

const Avatar = ({ avatar }) => {
  return (
    <AvatarPreview>
      <img
        className="profile-image"
        src={`http://localhost:4000/${avatar.filePath}`}
        alt="img"
      />
    </AvatarPreview>
  );
};

export default Avatar;
