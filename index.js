import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3001",
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) && onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  const onlineUser= onlineUsers.find((user) => user.username === username);
  
  return onlineUser;
};

 console.log(onlineUsers)

io.on("connection", (socket) => {
  console.log("Someone has connected!");

  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
    io.emit("getUsers", onlineUsers);
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    console.log(receiverName);
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });

  socket.on("sendText", ({ senderName, receiverName, text,type}) => {
    console.log(receiverName);
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getText", {
      senderName,
      text,
      type
    });
  });


  socket.on("disconnect", () => {
    console.log("Some has disconnected!");
    removeUser(socket.id);
  });
});

io.listen(5000);
