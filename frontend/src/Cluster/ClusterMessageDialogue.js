import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/system";
import { DialogContent, DialogContentText, Checkbox } from "@mui/material";
import Typography from "@mui/material/Typography";
import CustomPrimaryButton from "../shared/components/CustomPrimaryButton";
import { sendDirectMessage } from "../realtimeCommunication/socketConnection";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import InputWithLabel from "../shared/components/InputWithLabel";
const ClusterMessageDialogue = ({
  isMessageDialogOpen,
  cluster,
  closeMessageDialogHandler,
}) => {
  const handleCloseDialog = () => {
    closeMessageDialogHandler();
  };
  const InputContainer = styled("div")({
    position: "relative",
    width: "98%",
  });
  const Input = styled("input")({
    backgroundColor: "#2f3136",
    width: "98%",
    height: "44px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    padding: "0 10px",
  });
  const SendButton = styled("button")({
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    backgroundColor: "#2f3136",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  });
  const [message, setMessage] = useState("");

  const handleMessageValueChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    console.log(cluster.friendlist);
    if (message.length > 0 && cluster.friendlist.length > 0) {
      cluster.friendlist.map((f) =>
        sendDirectMessage({
          receiverUserId: f,
          content: message,
        })
      );

      setMessage("");
      closeMessageDialogHandler();
    }
  };
  return (
    <div>
      <Dialog open={isMessageDialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          {/* <InputContainer> */}
          <InputWithLabel
            type="text"
            setValue={setMessage}
            placeholder={`Write message to ${cluster.name}`}
          />
          {/* <Input
              placeholder={`Write message to cluster ${cluster.name}`}
              // value={message}
              onChange={handleMessageValueChange}
             
            /> */}
          <SendButton onClick={handleSendMessage}>
            <SendIcon />
          </SendButton>
          {/* </InputContainer> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClusterMessageDialogue;
