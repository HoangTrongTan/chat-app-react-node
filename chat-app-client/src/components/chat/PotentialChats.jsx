import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const PotentialChats = () => {
  const {user} = useContext(AuthContext);
  const { potentialChats , createChat , onLineUsers } = useContext(ChatContext);
//   console.log(">>>potentialChats: ... ", potentialChats);
  return (
    <>
      <div className="all-users">
        {potentialChats &&
          potentialChats.map((u, index) => {
            return (
              <div key={index} className="single-user" onClick={() => createChat(user._doc?._id , u._id)}>
                {u.username};
                <span className={onLineUsers?.some((user) => user.userId === u._id) ? "user-online" : "" }></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PotentialChats;
