import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetchRecipientUser from "../../hooks/useFetchRecipient";
import { ChatContext } from "../../context/ChatContext";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import { io } from 'socket.io-client'

function ChatBox() {
  const { user } = useContext(AuthContext);
  const { cuurentChat, messages, isMessagesLoading, messageError , sendTextMessage } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(cuurentChat, user?._doc);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();

  useEffect( () => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  } , [messages] );

  if (!recipientUser)
    return (
      // <p style={{ textAlign: "center", width: "100%" }}>
      //   No conversation selected yet ....
      // </p>
      <></>
    );
  if (isMessagesLoading)
    return (
      <Stack gap={4} className="chat-box">
        Loading chat ....
      </Stack>
    );
  return (
    <>
      <Stack gap={4} className="chat-box">
        <div className="chat-header">
          <strong>{recipientUser.username}</strong>
        </div>

        <Stack gap={3} className="messages">
          {messages &&
            messages.map((message, index) => {
              return (
                <Stack
                  key={index}
                  className={`${
                    message?.senderId === user?._doc?._id
                      ? "message self align-self-end flex-grow-0"
                      : "message align-self-start flex-grow-0"
                  }`}
                  ref={scroll}
                >
                  <span>{message.text}</span>
                  <span className="message-footer">
                    {moment(message.createdAt).calendar()}
                  </span>
                </Stack>
              );
            })}
        </Stack>
        {/*  */}
        <Stack
          direction="horizontal"
          gap={3}
          className="chat-input flex-grow-0"
        >
          <InputEmoji
            value={textMessage}
            onChange={setTextMessage}
            fontFamily="nunito"
            borderColor="rgba(72 , 112, 223, 0.2)"
            keepOpened={true}
            theme="dark"
          />
          <button className="send-btn" onClick={ () => sendTextMessage(textMessage , user , cuurentChat._id , setTextMessage) }>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-send-arrow-up"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15.854.146a.5.5 0 0 1 .11.54l-2.8 7a.5.5 0 1 1-.928-.372l1.895-4.738-7.494 7.494 1.376 2.162a.5.5 0 1 1-.844.537l-1.531-2.407L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM5.93 9.363l7.494-7.494L1.591 6.602z"
              />
              <path
                fillRule="evenodd"
                d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.354a.5.5 0 0 0-.722.016l-1.149 1.25a.5.5 0 1 0 .737.676l.28-.305V14a.5.5 0 0 0 1 0v-1.793l.396.397a.5.5 0 0 0 .708-.708z"
              />
            </svg>
          </button>
        </Stack>
      </Stack>
    </>
  );
}

export default ChatBox;
