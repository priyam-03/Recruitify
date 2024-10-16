import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import * as roomHandler from "../../realtimeCommunication/roomHandler";

const CreateRoomButton = ({ isUserInRoom }) => {
  const createNewRoomHandler = () => {
    roomHandler.createNewRoom();
  };

  return (
    <>
      <style>
        {`
          @keyframes bgColorChange {
            0% { background-color: #5865F2; } /* Starting color */
            50% { background-color: #FF5733; } /* Transition color */
            100% { background-color: #5865F2; } /* End with original color */
          }
        `}
      </style>
      <Button
        disabled={isUserInRoom}
        onClick={createNewRoomHandler}
        style={{
          width: "188px",
          height: "48px",
          borderRadius: "26px",
          margin: 0,
          padding: 0,
          minWidth: 0,
          marginTop: "10px",
          color: "white",
          backgroundColor: "#5865F2",
          animation: "bgColorChange 3s infinite", // Animation property
        }}
      >
        Create New Meeting
      </Button>
    </>
  );
};

export default CreateRoomButton;
