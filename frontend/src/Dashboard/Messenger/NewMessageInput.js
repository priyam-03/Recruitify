import React, { useState } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import {
  sendDirectMessage,
  sendGroupMessage,
} from "../../realtimeCommunication/socketConnection";
import { useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
const MainContainer = styled("div")({
  height: "60px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
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

const NewMessageInput = ({ chosenChatDetails, chatType }) => {
  // const { userInfo } = useSelector((state) => state.auth);
  // const { receiverInfo } = useSelector((state) => state.chat);
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
    if (message.length > 0) {
      if (chatType == "DIRECT") {
        sendDirectMessage({
          receiverUserId: chosenChatDetails.id,
          content: message,
        });
      } else {
        sendGroupMessage({
          conversationId: chosenChatDetails.id,
          content: message,
        });
      }
      setMessage("");
    }
  };

  return (
    <MainContainer>
      <InputContainer>
        <Input
          placeholder={`Write message to ${chosenChatDetails.name}`}
          value={message}
          onChange={handleMessageValueChange}
          onKeyDown={handleKeyPressed}
        />
        <SendButton onClick={handleSendMessage}>
          <SendIcon />
        </SendButton>
      </InputContainer>
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStoreStateToProps)(NewMessageInput);
