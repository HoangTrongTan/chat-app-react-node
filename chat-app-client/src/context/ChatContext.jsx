import { useCallback, useEffect } from "react";
import { createContext, useState } from "react";
import { getRequest, baseURL, postRequest } from "../utils/service";
import { io } from "socket.io-client";

export const ChatContext = createContext();

function ChatContextProvider({ children, user }) {
  const [userChats, setUserChats] = useState();

  const [isUserChatsLoading, setIsUserLoading] = useState(false);
  const [userChatError, setUserChatError] = useState();
  const [potentialChats, setPotentialChats] = useState([]);

  const [cuurentChat, setCurrentChat] = useState(null);

  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setMessagesLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [sendTextMessageError, setSendTextMessgaeError] = useState("");
  const [newMessage, setNewMessage] = useState("");
  
  const [socket, setSocket] = useState(null);
  const [onLineUsers, setOnlineUsers] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [allUsers, setAllUsers] = useState();
  const [groupUserChats, setGroupUserChats] = useState([]);
  const [chooseUser, setChooseUser] = useState([]);
  //state group chat
  const [currentGroupChat,setCurrentGroupChat] = useState();
  const [newGroupMessage, setGroupNewMessage] = useState("");
  const [senderIdInGroup,setSenderIdInGroup] = useState("");
  //
  console.log("Group chats: ", groupUserChats);
  // 26:58

  const setChooseUserForGroup = useCallback((id) => {
    if (chooseUser.includes(id)) {
      setChooseUser((prev) => prev.filter( (ite) => ite !== id ));
    }else{
      setChooseUser( prev => [...prev, id] );
    }
  });

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._doc?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);
  // console.log("User", user);
  useEffect(() => {
    if (socket === null) return;
    const recipientId = cuurentChat?.members.find(
      (id) => id !== user?._doc?._id
    );
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);
  useEffect(() => {
    if (socket === null) return;
    socket.emit("sendMessage", { ...newMessage, senderIdInGroup });
  }, [newGroupMessage]);


  //receive message and notifications
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      console.log("nhận tin nhắn...", res);
      if (cuurentChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });

    socket.on("getNotification", (res) => {
      const isChatOpen = cuurentChat?.members.some((id) => id === res.senderId);

      if (isChatOpen) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotifications((prev) => [res, ...prev]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, cuurentChat]);


  //receive message and notifications
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      console.log("nhận tin nhắn...", res);
      if (currentGroupChat?._id !== res.chatId) return;
      setMessages((prev) => [...prev, res]);
    });

    socket.on("getNotification", (res) => {
      const isChatOpen = currentGroupChat?.members.some((id) => id === res.senderId);

      if (isChatOpen) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotifications((prev) => [res, ...prev]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentGroupChat]);


  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseURL}/user/all/acc`);
      if (response.error) {
        return console.log("Error fetching  users", response);
      }
      // console.log("ALL acc:..", response, "User:...", user);
      const pChats = response.filter((u) => {
        let isChatCreated = false;

        if (user?._doc?._id === u._id) return false;

        if (userChats) {
          isChatCreated = userChats.some((ite) => {
            // return chat.members[0] === u?._id || chat.members[1] === u?._id;
            return ite.members.includes(u._id);
          });
        }
        return !isChatCreated;
      });

      setPotentialChats(pChats);
      setAllUsers(response);
    };
    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._doc?._id) {
        setIsUserLoading(true);
        setUserChatError(null);
        const response = await getRequest(
          `${baseURL}/chats/${user?._doc?._id}`
        );
        setIsUserLoading(false);
        if (response.error) {
          return setUserChatError(response.error);
        }
        setUserChats(response);
      }
    };
    getUserChats();
  }, [user, notifications]);

  //Get group chats
  useEffect(() => {
    const getGroupChats = async () => {
      if (user?._doc?._id) {
        const response = await getRequest(
          `${baseURL}/groups/${user?._doc?._id}`
        );
        setGroupUserChats(response);
      }
    };
    getGroupChats();
  }, [user]);
  //------------------

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("You must type something...");
      const response = await postRequest(
        `${baseURL}/messages`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender._doc._id,
          text: textMessage,
        })
      );

      if (response.error) {
        return setSendTextMessgaeError(response);
      }

      setNewMessage(response);

      setMessages((prev) => [...prev, response]);

      setTextMessage("");
    },
    []
  );
  const sendTextGroupMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("You must type something...");
      const response = await postRequest(
        `${baseURL}/messages`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender._doc._id,
          text: textMessage,
        })
      );

      if (response.error) {
        return setSendTextMessgaeError(response);
      }

      setGroupNewMessage(response);

      setMessages((prev) => [...prev, response]);
      setSenderIdInGroup(sender?._doc?._id);
      setTextMessage("");
    },
    []
  );

  useEffect(() => {
    const getMessages = async () => {
      setMessagesLoading(true);
      setMessageError(null);
      const response = await getRequest(
        `${baseURL}/messages/${cuurentChat?._id}`
      );
      setMessagesLoading(false);
      if (response.error) {
        return setMessageError(response.error);
      }
      setMessages(response);
    };
    getMessages();
  }, [cuurentChat]);
  //set message group chat
  useEffect(() => {
    const getMessages = async () => {
      setMessagesLoading(true);
      setMessageError(null);
      const response = await getRequest(
        `${baseURL}/messages/${currentGroupChat?._id}`
      );
      setMessagesLoading(false);
      if (response.error) {
        return setMessageError(response.error);
      }
      setMessages(response);
    };
    getMessages();
  }, [currentGroupChat]);
  const updateCurrentGroupChat = useCallback( (group) => {
    setCurrentChat(null);
    setCurrentGroupChat(group);

  } , [] );
  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseURL}/chats`,
      JSON.stringify({
        firstId,
        secondId,
      })
    );

    if (response.error) {
      return console.log("Errror creat chat ", response);
    }
    setUserChats((prev) => [...prev, response]);
  }, []);

  const markAllNotificationsAnRead = useCallback((notification) => {
    const mNofications = notification.map((n) => {
      return { ...n, isRead: true };
    });

    setNotifications(mNofications);
  }, []);

  const markNotificationAsRead = useCallback(
    (n, user_Chats, user, notification_s) => {
      //n là các notifications

      //tìm ra thằng user hiện tại và thằng members cùng user
      const desiredChat = user_Chats.find((chat) => {
        const chatMembers = [user?._doc?._id, n.senderId];
        const isDesiredChat = chat?.members.every((members) => {
          return chatMembers.includes(members);
        });
        return isDesiredChat;
      });

      const mNotifications = notification_s.map((el) => {
        if (n.senderId === el.senderId) {
          return { ...n, isRead: true };
        } else {
          return el;
        }
      });
      updateCurrentChat(desiredChat);
      setNotifications(mNotifications);
    },
    []
  );
  const markThisUserNotificationAsRead = useCallback(
    (thisUserNotifications, notification_s) => {
      const mNotifications = notification_s.map((el) => {
        let notification;
        thisUserNotifications.forEach((n) => {
          if (n.senderId === el.senderId) {
            notification = { ...n, isRead: true };
          } else {
            notification = el;
          }
        });
        return notification;
      });
      setNotifications(mNotifications);
    },
    []
  );

  const createGroupChat = useCallback( async (members, user) => {
    members.push(user?._doc?._id);
    const response = await postRequest(`${baseURL}/groups/create` , JSON.stringify({members}));
    if(response.error){
      return console.log(error);
    }
    setGroupUserChats(prev => [...prev, response ]);
    setChooseUser([]);
  } , [] );
  // 49/03
  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatError,
        potentialChats,
        createChat,
        updateCurrentChat,
        cuurentChat,
        messages,
        isMessagesLoading,
        messageError,
        sendTextMessage,
        onLineUsers,
        notifications,
        allUsers,
        markAllNotificationsAnRead,
        markNotificationAsRead,
        markThisUserNotificationAsRead,
        newMessage,
        groupUserChats,
        setChooseUserForGroup,
        chooseUser,
        createGroupChat,
        updateCurrentGroupChat,
        currentGroupChat,
        sendTextGroupMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContextProvider;
