const socketIO = require("socket.io")();
const ot = require("../../node_modules/ot");

//Custom
const users = require("../users/users.js");
const StreamServer = {};
const {
  addRoom,
  isRoomExist,
  getRoom,
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("../users/users.js");

// StreamServer -
StreamServer.io = socketIO;

StreamServer.io.on("connection", (socket) => {
  // User connected!
  console.log("New Connection.");

  // socket events -
  socket.on("join", (callback, { userId, roomId, userName }) => {
    console.log(`User - ${userName} wants to join the room - ${roomId}`);
    if (!isRoomExist(roomId)) {
      const otServer = new ot.EditorSocketIOServer(
        "// Hey there",
        [],
        roomId,
        function (socket, cb) {
          console.log(this);
          cb(true);
        }
      );
      addRoom(roomId, otServer);
      console.log(`Room- ${roomId} Created!`);
    }

    const otServ = getRoom(roomId);
    otServ.addClient(socket);
    otServ.setName(socket, userName);

    console.log(`Added the User - ${userName} to the Room - ${roomId}`);

    socket.room = roomId;
    socket.userName = userName;
    // Join user to this room!
    socket.join(roomId);
  });

  socket.on("leave", () => {
    console.log(
      `User - ${
        socket.userName ? socket.userName : ""
      } dropped Out from the Room ${socket.room}!`
    );
    socket.leave(socket.room);
  });

  // On disconnect!
  socket.on("disconnect", () => {
    console.log(
      `User - ${socket.userName ? socket.userName : ""} Disconnected!`
    );
    socket.leaveAll();
  });
});

module.exports = StreamServer;
