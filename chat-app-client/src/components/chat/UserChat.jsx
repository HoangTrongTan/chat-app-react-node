import { Stack } from "react-bootstrap";
import useFetchRecipientUser from "../../hooks/useFetchRecipient";
import avartar from "../../assets/avartar.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotifications } from "../../utils/unReadNotifications";
import useFetchLatesMessages from "../../hooks/useFetchLatesMessages";
import moment from "moment";

const UserChat = ({ chat, user }) => {
  //destructering
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onLineUsers, notifications , markThisUserNotificationAsRead  } = useContext(ChatContext);
  const {latesMessage} = useFetchLatesMessages(chat);
  // console.log(">>>RecipientUser: ", recipientUser);
  const unReadNotifications = unreadNotifications(notifications);
  const thisUserNotifications = unReadNotifications?.filter(//những user cùng members với user hiện tại
    (n) => n.senderId === recipientUser?._id
  );

  const isOnline = onLineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );

  const truncateText = (text) => {
    let shortText = text.substring(0, 20);
    if(text.length > 20){
      shortText = shortText + "....";
    }
    return shortText;
  }
  return (
    <>
      <Stack
        direction="horizontal"
        gap={3}
        className="user-card align-items-center p-2 justify-content-between"
        role="button"
        onClick={() => {
          if(thisUserNotifications?.length !== 0){
            markThisUserNotificationAsRead(
              thisUserNotifications, notifications
            )
          }
        }}
      >
        <div className="d-flex" style={{ color: "#000" }}>
          <div className="me-2">
            <img src={avartar} alt="" height={45} />
          </div>
          <div className="text-content">
            <div className="name">{recipientUser?.username}</div>
            <div className="text">{
              latesMessage?.text && (
                <span>{truncateText(latesMessage?.text)}</span>
              )
            }</div>
          </div>
          <div className="d-flex flex-column align-items-end">
            <div className="date">{moment(latesMessage?.createAt).calendar()}</div>
            <div
              className={
                thisUserNotifications?.length > 0
                  ? "this-user-notifications"
                  : ""
              }
            >
              {thisUserNotifications?.length > 0
                ? thisUserNotifications?.length
                : ""}
            </div>
            <div className={isOnline ? "user-online" : ""}></div>
          </div>
        </div>
      </Stack>
    </>
  );
};
export default UserChat; //35:45
