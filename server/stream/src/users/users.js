// Array of connected users
const users = [];

const rooms = {};

// Add room
const addRoom = (roomId, otServer) => {
  rooms[roomId] = otServer; 
};

const isRoomExist = (roomId)=>{
    return rooms.hasOwnProperty(roomId);
}

// Add User to a room;
const addUser = (errCallback, userId, roomId) => {
  const isUserExist = users.find((user) => {
    return user.userId == userId;
  });


  if (!isUserExist) {
    if(isRoomExist(roomId)){
        users.push({ userId, roomId });
    }else{
        return false;
    }
  } 
  return true; 
};

const removeUser = (errCallback, userId) => {
  const index = users.indexOf(userId);

  if (index) {
    users.splice(index, 1);
  } else {
    // return the err;
    errCallback("User does not exist!");
  }
};

const getUser = (userId) => {
  return users.find((user) => {
    return user.userId == userId;
  });
};

const getUsersInRoom = (roomId) => {
  return users.filter((user) => {
    return (user.roomId = roomId);
  });
};

const getRoom = (roomId)=>{
    return rooms[roomId];
}

module.exports = {addRoom, isRoomExist, getRoom,addUser, removeUser, getUser, getUsersInRoom };
