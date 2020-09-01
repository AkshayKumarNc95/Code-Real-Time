"use strict";

var socketIO = require("socket.io")();

var ot = require("../../node_modules/ot"); //Custom


var users = require("../users/users.js");

var StreamServer = {};

var _require = require("../users/users.js"),
    addRoom = _require.addRoom,
    isRoomExist = _require.isRoomExist,
    getRoom = _require.getRoom,
    addUser = _require.addUser,
    removeUser = _require.removeUser,
    getUser = _require.getUser,
    getUsersInRoom = _require.getUsersInRoom; // StreamServer -


StreamServer.io = socketIO;
StreamServer.io.on("connection", function (socket) {
  // User connected!
  console.log("New Connection."); // socket events -

  socket.on("join", function (callback, _ref) {
    var userId = _ref.userId,
        roomId = _ref.roomId,
        userName = _ref.userName;
    console.log("User - ".concat(userName, " wants to join the room - ").concat(roomId));

    if (!isRoomExist(roomId)) {
      var otServer = new ot.EditorSocketIOServer("// Hey there", [], roomId, function (socket, cb) {
        console.log(this);
        cb(true);
      });
      addRoom(roomId, otServer);
      console.log("Room- ".concat(roomId, " Created!"));
    }

    var otServ = getRoom(roomId);
    otServ.addClient(socket);
    otServ.setName(socket, userName);
    console.log("Added the User - ".concat(userName, " to the Room - ").concat(roomId));
    socket.room = roomId;
    socket.userName = userName; // Join user to this room!

    socket.join(roomId);
  });
  socket.on("leave", function () {
    console.log("User - ".concat(socket.userName ? socket.userName : "", " dropped Out from the Room ").concat(socket.room, "!"));
    socket.leave(socket.room);
  }); // On disconnect!

  socket.on("disconnect", function () {
    console.log("User - ".concat(socket.userName ? socket.userName : "", " Disconnected!"));
    socket.leaveAll();
  });
});
module.exports = StreamServer;