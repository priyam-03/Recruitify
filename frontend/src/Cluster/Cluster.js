import React, { useState, useEffect } from "react";
import CustomPrimaryButton from "../shared/components/CustomPrimaryButton";
import ClusterDialog from "./ClusterDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  connectWithSocketServer,
  disconnect,
} from "../realtimeCommunication/socketConnection";
import { profile } from "../features/auth/authActions";
import ClusterMessageDialogue from "./ClusterMessageDialogue";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
const additionalStyles = {
  marginTop: "10px",
  marginLeft: "5px",
  width: "100%",
  height: "30px",
  background: "#3ba55d",
  display: "inline-block",
};

const Cluster = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [cluster, setCluster] = useState({});
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    connectWithSocketServer(userInfo);
    return () => {
      disconnect();
    };
  }, []);
  useEffect(() => {
    dispatch(profile());
  }, [isDialogOpen]);
  const handleOpenAddClusterDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseAddClusterDialog = () => {
    setIsDialogOpen(false);
  };
  const handleOpenMessageDialog = (cluster) => {
    console.log(cluster);
    setCluster(cluster);
    setIsMessageDialogOpen(true);
  };

  const handleCloseMessageDialog = () => {
    setIsMessageDialogOpen(false);
  };

  return (
    <div>
      <CustomPrimaryButton
        additionalStyles={additionalStyles}
        label="Add New Cluster"
        onClick={handleOpenAddClusterDialog}
      />
      <ClusterDialog
        isDialogOpen={isDialogOpen}
        closeDialogHandler={handleCloseAddClusterDialog}
      />
      <h2>All the clusters are ....</h2>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        {userInfo.user.clusters.length > 0 &&
          userInfo.user.clusters.map((c) => (
            <ListItem
              key={c._id}
              disableGutters
              secondaryAction={
                <IconButton
                  aria-label="comment"
                  onClick={() => handleOpenMessageDialog(c)}
                >
                  <SendIcon />
                </IconButton>
              }
            >
              <ListItemText primary={` ${c.name}`} />
            </ListItem>
          ))}
      </List>
      <ClusterMessageDialogue
        isMessageDialogOpen={isMessageDialogOpen}
        cluster={cluster}
        closeMessageDialogHandler={handleCloseMessageDialog}
      />
    </div>
  );
};

export default Cluster;
