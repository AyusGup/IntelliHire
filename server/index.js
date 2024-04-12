const express= require("express");
const cors= require("cors");
const bodyParser= require("body-parser");
const http= require("http");
const {Server}= require("socket.io");
const newUser= require("./routes/newUser");
// const {handlenewUser}= require("../controller/user");
const app= express();

const server= http.createServer(app);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended:true}));

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));
const io = new Server(server, {
  cors: true,
});
app.get("/", (req, res) => {

  res.send("Hello Express");
  
  });



const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room,type} = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});


server.listen(8000, () => {
  console.log("server listening on port: 8000");
})
