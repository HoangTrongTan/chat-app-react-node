import { useContext, useEffect, useState } from "react";
import { baseURL, getRequest } from "../utils/service";
import { ChatContext } from "../context/ChatContext";

function useFetchLatesMessages(chat) {
  const { notifications, newMessage } = useContext(ChatContext);
  const [latesMessage, setLatesMessage] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      const response = await getRequest(`${baseURL}/messages/${chat?._id}`);
      if (response.error) {
        return console.log("Error getting messages...", error);
      }
      const latesMessage = response[response?.length - 1];
      setLatesMessage(latesMessage);
    };
    getMessages();
  }, [newMessage, notifications]);
  return { latesMessage };
}

export default useFetchLatesMessages;
