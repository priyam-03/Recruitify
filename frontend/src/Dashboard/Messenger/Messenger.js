import React from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import WelcomeMessage from "./WelcomeMessage";
import MessengerContent from "./MessengerContent";
import { useSelector } from "react-redux";
const MainContainer = styled("div")({
  flexGrow: 1,
  backgroundColor: "#36393f",
  // marginTop: "48px",
  display: "flex",
  // height: "100%",
});

const Messenger = () => {
  const data = useSelector((state) => state.chat);

  const { chosenChatDetails, chatType } = data;
  console.log(typeof chatType);
  return (
    <MainContainer>
      {!chosenChatDetails ? <WelcomeMessage /> : <MessengerContent />}
    </MainContainer>
  );
};

// const mapStoreStateToProps = ({ chat }) => {
//   return {
//     ...chat,
//   };
// };

// export default connect(mapStoreStateToProps)(Messenger);
export default Messenger;
