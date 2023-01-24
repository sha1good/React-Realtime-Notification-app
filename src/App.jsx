import { useEffect, useState } from "react";
import "./app.css";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";
import { posts } from "./data";
import { io } from "socket.io-client";

const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  const handleUser = (event) => {
    event.preventDefault();
    setUser(username);
  };

  //console.log(user);
  useEffect(() => {
    setSocket(io("http://localhost:5000"));
   }, []);

  //Add new user
  useEffect(() => {
    socket && socket.emit("newUser", user);
  }, [socket, user]);

useEffect(() =>{
  socket && socket.on("getUsers", users =>{
    console.log(users)
  })
}, [socket])

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}
          <span className="username">{user}</span>
        </>
      ) : (
        <div className="login">
          <h2>Sha1 App</h2>
          <input
            type="text"
            placeholder="username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <button onClick={handleUser}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
