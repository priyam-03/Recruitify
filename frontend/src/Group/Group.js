import React, { useState, useEffect } from "react";
import CustomPrimaryButton from "../shared/components/CustomPrimaryButton";
import GroupDialog from "./GroupDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  connectWithSocketServer,
  disconnect,
} from "../realtimeCommunication/socketConnection";
import { profile } from "../features/auth/authActions";

const additionalStyles = {
  marginTop: "10px",
  marginLeft: "5px",
  width: "100%",
  height: "30px",
  background: "#3ba55d",
  display: "inline-block",
};

const Group = () => {
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

  return (
    <div>
      <CustomPrimaryButton
        additionalStyles={additionalStyles}
        label="Add New Group"
        onClick={handleOpenAddClusterDialog}
      />
      <GroupDialog
        isDialogOpen={isDialogOpen}
        closeDialogHandler={handleCloseAddClusterDialog}
      />
      {/* <h2>All the clusters are ....</h2> */}
      {/* <List
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
      </List> */}
      {/* <ClusterMessageDialogue
        isMessageDialogOpen={isMessageDialogOpen}
        cluster={cluster}
        closeMessageDialogHandler={handleCloseMessageDialog}
      /> */}
    </div>
  );
};

export default Group;
