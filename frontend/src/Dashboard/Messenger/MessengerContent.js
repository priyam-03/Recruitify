import React, { useEffect } from "react";
import { styled } from "@mui/system";
import Messages from "./Messages/Messages";
import NewMessageInput from "./NewMessageInput";
import { useSelector } from "react-redux";
import {
  getDirectChatHistory,
  getGroupChatHistory,
} from "../../realtimeCommunication/socketConnection";

const Wrapper = styled("div")({
  flexGrow: 1,
});

const MessengerContent = (props) => {
  const data = useSelector((state) => state.chat);
  console.log(data, "data");
  const { chosenChatDetails, chatType } = data;
  useEffect(() => {
    if (chatType == "DIRECT") {
      console.log(chatType, "chatType");
      getDirectChatHistory({
        receiverUserId: chosenChatDetails.id,
      });
    } else {
      getGroupChatHistory({
        _id: chosenChatDetails.id,
      });
    }
  }, [chosenChatDetails]);

  return (
    <Wrapper>
      <Messages />
      <NewMessageInput />
    </Wrapper>
  );
};

export default MessengerContent;
