import React, { useState, useCallback, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [type,setType] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();
  const current  = useLocation();
  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log("fuck you " , email,room,type);
      socket.emit("room:join", { email, room,type });
    },
    [email, room, socket,type]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room,type} = data;
      console.log(data);
      if(type==="Candidate")
      navigate(current.pathname + "/online/candidate"+"/room/" +room);
      else
      navigate(current.pathname + "/online/interviewer"+"/room/" +room);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="mt-[100px]">
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room Number</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <select
              name="type"
              id="type"
              value={type}
              onChange={(e) => {
                console.log(e.target.value);
                setType(e.target.value);
              }}
            >
              <option value="Interviewer">Interviewer</option>
              <option value="Candidate">Candidate</option>
        </select>
        <button>Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;
