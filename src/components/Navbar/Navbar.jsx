import "./navbar.css";

import Notification from "../../img/notification.svg";
import Message from "../../img/message.svg";
import Settings from "../../img/settings.svg";
import { useEffect, useState } from "react";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [messageChats, setMessageChats] = useState([]);

  const [openNotification, setOpenNotification] = useState(false);
  const [openChats, setOpenChats] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [notifications, socket]);

  useEffect(() => {
    socket.on("getText", (data) => {
      setMessageChats((prev) => [...prev, data]);
    });
  }, [messageChats, socket]);

 // console.log(messageChats);
  //console.log(notifications);
 

  const displayNotification = ({ senderName, type }) => {
    let action;
    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post`}</span>
    );
  };

  const displayChatNotification = ({ senderName, type, text }) => {
    let action;
    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = text;
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName} ${action}`}</span>
    );
  };

  const handleReadClick = () => {
    setNotifications([]);
    setOpenNotification(false);
  };

  const handleChatClick = () => {
    setMessageChats([]);
    setOpenChats(false);
  };

  return (
    <div className="navbar">
      <span className="logo">Sha1 App</span>
      <div className="icons">
        <div
          className="icon"
          onClick={() => setOpenNotification(!openNotification)}
        >
          <img src={Notification} alt="" className="iconImg" />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
        <div className="icon" onClick={() => setOpenChats(!openChats)}>
          <img src={Message} alt="" className="iconImg" />
          {messageChats.length > 0 && (
            <div className="counter">{messageChats.length}</div>
          )}
        </div>
        <div className="icon">
          <img src={Settings} alt="" className="iconImg" />
          {/* {notifications.length > 0  && action === "shared" && (
            <div className="counter">{notifications.length}</div>
          )} */}
        </div>
      </div>
      <div>
        {" "}
        { openNotification && (
          <div className="notifications">
            {notifications.map((notification) =>
              displayNotification(notification)
            )}
            <button className="notiticationButton" onClick={handleReadClick}>
              Marked As Read
            </button>
          </div>
        )}
      </div>
      <div>
        {" "}
        { openChats && (
          <div className="notifications">
            {messageChats.map((messageChat) =>
              displayChatNotification(messageChat)
            )}
            <button className="notiticationButton" onClick={handleChatClick}>
              Marked As Read
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
