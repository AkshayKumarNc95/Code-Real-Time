const socketIO = require("socket.io")();
const ot = require("ot");

//#region Declarations 
const StreamServer = {};

const {
  addRoom,
  addUserToRoom,
  isRoomExist,
  getRoom,
  removeUserFromRoom,
} = require("../rooms/rooms.js");

StreamServer.io = socketIO;

//#endregion 

// Connection and setup -
StreamServer.io.on("connection", (socket) => {
  // User connected!
  console.log("New Connection.");

  // socket events -
  socket.on("join", (callback, { userId, roomId, userName }) => {
    joinRoom(userId, userName, roomId, socket);
  });

  socket.on("leave", () => {
    leaveRoom(socket);
  });

  // On disconnect!
  socket.on("disconnect", () => {
    console.log(
      `User - ${socket.userName ? socket.userName : ""} Disconnected!`
    );
    socket.leaveAll();
    socket.disconnect();
  });
});

// Leave Room; 
function leaveRoom(socket) {
  console.log(
    `User - ${
      socket.userName ? socket.userName : ""
    } dropped Out from the Room ${socket.room}!`
  );
  
  // Trigger an event, and send the room details to the client.
  removeUserFromRoom(socket.room, socket.userId);
  const room = getRoom(socket.room);
  StreamServer.io.sockets
    .in(socket.room)
    .emit("UpdatedRoomInfo", room.activeUsers);
  socket.leave(socket.room);
}

// Create and/or join a Room
function joinRoom(userId, userName, roomId, socket) {
  try {
    console.log(`User - ${userName} wants to join the room - ${roomId}`);

    // Check if the room exists, if not create a room
    // with the roomId provided.
    if (!isRoomExist(roomId)) {
      const otServer = new ot.EditorSocketIOServer(
        `// Hi, You are now online. Room- ${roomId}`,
        [],
        roomId,
        function (socket, cb) {
          cb(true);
        }
      );
      addRoom(roomId, otServer, { userId, userName });
      console.log(`Room- ${roomId} Created!`);
    }
    const room = getRoom(roomId);

    // Connect the OT server with the socket
    const otServ = room.otServer;
    otServ.addClient(socket);
    otServ.setName(socket, userName);

    console.log(`Added the User - ${userName} to the Room - ${roomId}`);

    // Join the user to this room!
    socket.join(roomId);
    addUserToRoom(roomId, { userId, userName });

    // Set the userName to socket for later use.
    socket.userName = userName;
    socket.room = roomId;
    socket.userId = userId;
    console.log("Sending room updates");
    // Trigger an event, and send the room details to the client.
    StreamServer.io.sockets
      .in(roomId)
      .emit("UpdatedRoomInfo", room.activeUsers);
  } catch (e) {
    // This makes the client to trigger disconnect and probably reconnect again...
    socket.emit("error", { message: e.message });
    removeUserFromRoom(roomId, userId);
  }
}

module.exports = StreamServer;
