import React, { useEffect } from "react";
import { styled } from "@mui/system";
import SideBar from "./SideBar/SideBar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { store } from "../store/store";
import { connect } from "react-redux";
import { getGroup } from "../api";
import { setGroup } from "../store/actions/friendsActions";
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

const Dashboard = ({ isUserInRoom }) => {
  const { userInfo } = useSelector((state) => state.auth);

  // const fetch = async () => {
  //   const group = await getGroup();
  //   console.log("group" + group);
  //   store.dispatch(setGroup(group));

  // }; const dispatch = useDispatch();
  // const fetch = async () => {
  //   const group = await getGroup();
  //   console.log("group" + group);
  //   store.dispatch(setGroup(group));
  // };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setGroup());
    connectWithSocketServer(userInfo);
    return () => {
      disconnect();
    };
  }, [dispatch]);

  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
      {isUserInRoom && <Room />}
    </Wrapper>
  );
};
const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};
export default connect(mapStoreStateToProps)(Dashboard);
