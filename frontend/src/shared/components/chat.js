import React, { useEffect, useRef } from "react";
import styles from "../../styles/chat.module.css";

function Chat({ chat }) {
  const chatLog = chat;
  console.log(chatLog);
  // console.log(chat);
  const lastChat = useRef(null);

  useEffect(() => {
    if (lastChat.current) {
      lastChat.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatLog]);

  return (
    <div>
      {Array.isArray(chatLog) && chatLog.length > 0 ? (
        chatLog.map((entry, index) => {
          const question = entry.question;
          const response = entry.response.text;

          return (
            <div key={index}>
              <div className={styles.chatDiv}>
                <img
                  src={"/You.svg"}
                  alt="Your icon"
                  className={styles.iconSpace}
                />
                <p>{question}</p>
              </div>
              <div className={styles.chatDiv}>
                <img
                  src={"/ChatIcon.svg"}
                  alt="Chat icon"
                  className={styles.iconSpace}
                />
                <p>{response}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p>Let's get started</p>
      )}
      <div ref={lastChat}></div>
    </div>
  );
}

export default Chat;
