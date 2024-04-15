import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";
import UserGroupChat from "../components/chat/UserGroupChat";
import CreateGroup from "../components/chat/CreateGroup";
import ChatGroupBox from "../components/chat/ChatGroupBox";

function Chat() {
  const {
    userChats,
    isUserChatsLoading,
    userChatError,
    groupUserChats,
    updateCurrentGroupChat,
  } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  return (
    <>
      <Container>
        {/* ----------------------- */}
        <CreateGroup />
        {/* ----------------------- */}
        <PotentialChats />
        {userChats?.length < 1 ? null : (
          <Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack className="messages-box flex-grow-0 pe-3">
              {isUserChatsLoading && <p>Loading chats.....</p>}
              {userChats?.map((chat, index) => {
                return (
                  <div key={index} onClick={() => updateCurrentChat(chat)}>
                    <UserChat chat={chat} user={user?._doc} />
                  </div>
                );
              })}

              {/*  --------------- Group Chats ------------------  */}
              {groupUserChats?.map((group, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      updateCurrentGroupChat(group);
                    }}
                  >
                    <UserGroupChat group={group} />
                  </div>
                );
              })}
            </Stack>
            <ChatBox />
            <ChatGroupBox />
          </Stack>
        )}
      </Container>
    </>
  );
}

export default Chat;
