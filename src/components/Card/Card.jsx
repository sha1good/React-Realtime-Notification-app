import "./card.css";
import Heart from "../../img/heart.svg";
import HeartFilled from "../../img/heartFilled.svg";
import Comment from "../../img/comment.svg";
import Share from "../../img/share.svg";
import Info from "../../img/info.svg";
import { useState } from "react";

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);
  //const [message, setMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [openMessage, setOpenMessage] = useState(false);

  const handleNotificationClick = (type) => {
    type === 1 && setLiked(!liked);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  const handleCommentNotification = (type) => {
    //type === 2 && setNewMessage(newMessage);
    socket.emit("sendText",{ 
      senderName: user,
      receiverName: post.username,
      text: newMessage,
      type
    })
     setNewMessage("");
  };
  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <img src={HeartFilled} alt="" className="cardIcon" />
        ) : (
          <img
            src={Heart}
            alt=""
            className="cardIcon"
            onClick={() => handleNotificationClick(1)}
          />
        )}

        <img
          src={Comment}
          alt=""
          className="cardIcon"
        onClick={() => setOpenMessage(!openMessage)}
        /> 
        <img
          src={Share}
          alt=""
          className="cardIcon"
          onClick={() => handleNotificationClick(3)}
        />
        <img src={Info} alt="" className="cardIcon infoIcon" />
      </div>
      { openMessage && (
        <div className="simpleForm">
          <div className="wrapper">
          <input
          type="text"
          placeholder="Comment..."
          onChange={(event) => setNewMessage(event.target.value)}
          value={newMessage}
          className="cardInput"
        />
        <button className="cardButton" onClick={() => handleCommentNotification(2)}>Send</button>
          </div>
      </div>
      )}
    </div>
  );
};

export default Card;
