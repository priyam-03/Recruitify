import React, { useEffect } from "react";
import { styled } from "@mui/system";
import SideBar from "./SideBar/SideBar";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import {
  connectWithSocketServer,
  disconnect,
} from "../realtimeCommunication/socketConnection";
import Room from "./Room/Room";
import { useDispatch } from "react-redux";
const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

const Interview = ({ isUserInRoom }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    connectWithSocketServer(userInfo);
    return () => {
      disconnect();
    };
  }, [dispatch]);

  return (
    <Wrapper>
      <SideBar />
      {isUserInRoom && <Room />}
    </Wrapper>
  );
};
const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};
export default connect(mapStoreStateToProps)(Interview);
