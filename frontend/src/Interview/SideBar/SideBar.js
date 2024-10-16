import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import CreateRoomButton from "./CreateRoomButton";
import ActiveRoomButton from "./ActiveRoomButton";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import {
  connectWithSocketServer,
  disconnect,
} from "../../realtimeCommunication/socketConnection";
import * as roomHandler from "../../realtimeCommunication/roomHandler";

const MainContainer = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  backgroundColor: "#202225",
  padding: "10px",
  overflowY: "auto",
});

const RoomButtonContainer = styled("div")({
  width: "200px",
  margin: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

// Custom styling for the dialog to look like a pop-up at the bottom-right corner
const CustomDialog = styled(Dialog)({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  margin: "0",
});

const SideBar = ({ activeRooms, isUserInRoom }) => {
  console.log(activeRooms);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    connectWithSocketServer(userInfo);
    return () => {
      disconnect();
    };
  }, [userInfo]);

  const handleAdmit = () => {
    roomHandler.admit({ roomId: currentRoom.roomId, request: selectedRequest });
    handleCloseDialog();
  };

  const handleReject = () => {
    roomHandler.reject({
      roomId: currentRoom.roomId,
      request: selectedRequest,
    });
    handleCloseDialog();
  };

  const handleOpenDialog = (room, request) => {
    setCurrentRoom(room);
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentRoom(null);
    setSelectedRequest(null);
  };

  return (
    <MainContainer>
      <RoomButtonContainer>
        <CreateRoomButton isUserInRoom={isUserInRoom} />
      </RoomButtonContainer>

      {activeRooms.map((room) => (
        <RoomButtonContainer key={room.roomId}>
          <ActiveRoomButton
            roomId={room.roomId}
            creatorUsername={room.creatorUsername}
            amountOfParticipants={room.participants.length}
            isUserInRoom={isUserInRoom}
          />

          {room.handleJoinRequest && room.joinRequests?.length > 0 && (
            <div style={{ marginTop: "10px", color: "#ffffff" }}>
              <h4>Join Requests:</h4>
              {room.joinRequests.map((request) => (
                <div key={request.userId} style={{ marginBottom: "10px" }}>
                  <p>{request.name}</p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog(room, request)}
                  >
                    Review Request
                  </Button>
                </div>
              ))}
            </div>
          )}
        </RoomButtonContainer>
      ))}

      {/* Dialog for Join Requests, styled as a pop-up at bottom-right */}
      <CustomDialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Join Request</DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <p>
              {selectedRequest.name} wants to join{" "}
              {currentRoom?.creatorUsername}'s room.
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleAdmit}>
            Admit
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleReject}>
            Reject
          </Button>
        </DialogActions>
      </CustomDialog>
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(SideBar);
