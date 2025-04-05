import React, { useState } from "react";
import styles from "../styles/chatbot.module.css";
import PdfReader from "../shared/components/PdfReader.js";
import Query from "../shared/components/query.js";
import Chat from "../shared/components/chat.js";

function CreateJobsAi() {
  const [boolianValue, setBoolianValue] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);

  const handleprocess = (status) => {
    setBoolianValue(status);
  };

  const getChatHistory = (history) => {
    setChatHistory((prevHistory) => [...prevHistory, history]); // Creates a new array
  };

  return (
    <div className={styles.parent}>
      <PdfReader pdfprocessed={handleprocess} />
      <div className={styles.content}>
        <h1>Let's create a job by AI </h1>
        <Chat chat={chatHistory} />
      </div>
      <Query boolian={boolianValue} chat={getChatHistory} />
    </div>
  );
}

export default CreateJobsAi;
