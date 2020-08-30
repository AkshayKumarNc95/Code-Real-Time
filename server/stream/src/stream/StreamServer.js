const socketIO = require("socket.io")();
const ot = require('../../node_modules/ot');

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
  console.log("A new User connected");

  // socket events -

  socket.on("join", (callback, { userId, roomId, userName }) => {
    if (!isRoomExist(roomId)) {
      // Add user to user list if not already exists
      // let success = addUser(userId, roomId);

      // if (!success) {
      //   callback("User already exists in the room!");
      // }
      const otServer = new ot.EditorSocketIOServer("// Hey there", [], roomId, function (socket, cb) {
        console.log(this);
        cb(true);
      });
      //console.log(otServer)
      // If the roomId already exists - Set handles it all!
      addRoom(roomId, otServer);
    }

    const otServ = getRoom(roomId);
    otServ.addClient(socket);
    otServ.setName(socket, userName);

    socket.room = roomId;
    // Join user to this room!
    socket.join(roomId);
  });

  // On disconnect!
  socket.on('disconnect', function() {
    console.log('User Disconnected!');
    socket.leave(socket.room);
  });
});

function joinUserToRoom(userId, roomId) {}

module.exports = StreamServer;
