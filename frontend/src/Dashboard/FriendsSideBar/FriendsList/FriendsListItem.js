import React from "react";
import Button from "@mui/material/Button";
import Avatar from "../../../shared/components/Avatar";
import { useDispatch } from "react-redux";

import Typography from "@mui/material/Typography";
import OnlineIndicator from "./OnlineIndicator";
import {
  chatTypes,
  getActions,
  setChosenChatDetails,
} from "../../../store/actions/chatActions";

import { connect } from "react-redux";

const FriendsListItem = ({
  id,
  username,
  avatar,
  isOnline,
  setChosenChatDetails,
  type,
}) => {
  const handleChooseActiveConversation = () => {
    if (type == "friend") {
      setChosenChatDetails(
        { id: id, name: username, avatar: avatar },
        chatTypes.DIRECT
      );
    } else {
      setChosenChatDetails({ id: id, name: username }, chatTypes.GROUP);
    }
  };

  return (
    <Button
      onClick={handleChooseActiveConversation}
      style={{
        width: "100%",
        height: "42px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textTransform: "none",
        color: "black",
        position: "relative",
      }}
    >
      {/* <Avatar avatar={avatar} /> */}
      <Typography
        style={{
          marginLeft: "7px",
          fontWeight: 700,
          color: "#8e9297",
        }}
        variant="subtitle1"
        align="left"
      >
        {username}
      </Typography>
      {isOnline && <OnlineIndicator />}
    </Button>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(FriendsListItem);
