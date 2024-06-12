import React from "react";
import { connect } from "react-redux";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
const ChosenOptionLabel = () => {
  var name = null;
  const { chosenChatDetails } = useSelector((state) => state.chat);
  if (chosenChatDetails) {
    name = chosenChatDetails.name;
  }
  return (
    <Typography
      sx={{ fontSize: "16px", color: "white", fontWeight: "bold" }}
    >{`${name ? `Chosen conversation: ${name}` : ""}`}</Typography>
  );
};

// const mapStoreStateToProps = (state) => {
//   return {
//     name: state.chat.chosenChatDetails?.name,
//   };
// };

// export default connect(mapStoreStateToProps)(ChosenOptionLabel);
export default ChosenOptionLabel;
