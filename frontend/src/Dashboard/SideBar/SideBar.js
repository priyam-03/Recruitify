import React from "react";
import { styled } from "@mui/system";
import MainPageButton from "./MainPageButton";
import CreateRoomButton from "./CreateRoomButton";
import { connect } from "react-redux";
import ActiveRoomButton from "./ActiveRoomButton";
import { useState, useEffect } from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import GroupDialog from "../../Group/GroupDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  connectWithSocketServer,
  disconnect,
} from "../../realtimeCommunication/socketConnection";
import { profile } from "../../features/auth/authActions";
import { setGroup } from "../../store/actions/friendsActions";
const MainContainer = styled("div")({
  width: "150px", // Adjust the width as needed
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
  padding: "10px", // Add padding for better spacing
});

const StyledMainPageButton = styled(MainPageButton)({
  marginBottom: "10px", // Add margin bottom to create gap
});

const StyledCreateRoomButton = styled(CreateRoomButton)({
  marginBottom: "10px", // Add margin bottom to create gap
});

const StyledActiveRoomButton = styled(ActiveRoomButton)({
  marginBottom: "10px", // Add margin bottom to create gap
});

const StyledCustomPrimaryButton = styled(CustomPrimaryButton)({
  marginBottom: "10px", // Add margin bottom to create gap
});

const SideBar = ({ activeRooms, isUserInRoom }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    connectWithSocketServer(userInfo);
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    dispatch(setGroup());
    dispatch(profile());
  }, [isDialogOpen]);

  const handleOpenAddClusterDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseAddClusterDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <MainContainer>
      <StyledMainPageButton className="check" />
      <StyledCreateRoomButton className="check" isUserInRoom={isUserInRoom} />
      {activeRooms.map((room) => (
        <StyledActiveRoomButton
          className="check"
          roomId={room.roomId}
          creatorUsername={room.creatorUsername}
          amountOfParticipants={room.participants.length}
          key={room.roomId}
          isUserInRoom={isUserInRoom}
        />
      ))}
      <StyledCustomPrimaryButton
        className="check"
        label="New Group"
        onClick={handleOpenAddClusterDialog}
      />
      <GroupDialog
        isDialogOpen={isDialogOpen}
        closeDialogHandler={handleCloseAddClusterDialog}
      />
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(SideBar);
