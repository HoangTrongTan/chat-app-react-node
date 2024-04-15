import useFetchRecipientUser from "../../hooks/useFetchRecipient";
import { useCallback, useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";

const UserGroup = ({ chat, user }) => {
  //destructering
  const { recipientUser } = useFetchRecipientUser(chat, user?._doc);
  const { onLineUsers, setChooseUserForGroup, chooseUser } =
    useContext(ChatContext);
  // console.log(">>>RecipientUser: ", recipientUser);
  const randomColor = useCallback(() => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }, []);
  const [isChoose, setIsChoose] = useState(false);
  useEffect( () => {
    if(chooseUser.includes(recipientUser?._id)){
      setIsChoose(true);
    }else{
      setIsChoose(false);
    }
  } , [chooseUser] );
  return (
    <>
      <div
        style={{
          cursor: "pointer",
          color: "#fff",
          padding: "10px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 0,
          background: randomColor(),
          position: "relative",
        }}
        onClick={() => {
          setChooseUserForGroup(recipientUser?._id);
        }}
      >
        {recipientUser?.username}
        {isChoose && (
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              color: "green",
            }}
          >
            <Icon />
          </div>
        )}
      </div>
    </>
  );
};
export default UserGroup;

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-check-circle"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
    </svg>
  );
};
