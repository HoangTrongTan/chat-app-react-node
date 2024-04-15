import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { Stack } from "react-bootstrap";
import InputEmojiWithRef from "react-input-emoji";
import moment from "moment";

function ChatGroupBox() {
  const { user } = useContext(AuthContext);
  const { currentGroupChat, messages, sendTextGroupMessage } =
    useContext(ChatContext);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  if (!currentGroupChat) {
    return <></>;
  }
  
  return (
    <>
      <Stack gap={4} className="chat-box" style={{ zIndex: 1000 }}>
        <div className="chat-header">
          <strong>group name</strong>
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
                  style={{ position: "relative" }}
                  ref={scroll}
                >
                  <div
                    className="representative-left"
                  >
                    name
                  </div>
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
          <InputEmojiWithRef
            value={textMessage}
            onChange={setTextMessage}
            fontFamily="nunito"
            borderColor="rgba(72 , 112, 223, 0.2)"
            keepOpened={true}
            theme="dark"
          />
          <button
            className="send-btn"
            onClick={() =>
              sendTextGroupMessage(
                textMessage,
                user,
                currentGroupChat._id,
                setTextMessage
              )
            }
          >
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

export default ChatGroupBox;
