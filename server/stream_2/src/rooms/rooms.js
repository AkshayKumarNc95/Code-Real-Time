// In memory rooms; 
const rooms = {};

// Add room
const addRoom = (roomId, otServer) => {
  room = {
    otServer,
    activeUsers: [],
  };

  rooms[roomId] = room;
};

const addUserToRoom = (roomId, { userId, userName }) => {
  if (!isRoomExist(roomId)) {
    return;
  }

  return rooms[roomId].activeUsers.push({ userId, userName });
};

const removeUserFromRoom = (roomId, userId) => {

  if (!isRoomExist(roomId)) {
    return;
  }

  const usersInRoom = rooms[roomId].activeUsers;

  const index = usersInRoom.findIndex((user)=>{
    return user.userId === userId;
  })
  rooms[roomId].activeUsers.splice(index,1); 
};


const isRoomExist = (roomId) => {
  return rooms.hasOwnProperty(roomId);
};

const getUsersInRoom = (roomId) => {
  return rooms[roomId].activeUsers; 
};

const getRoom = (roomId) => {
  return rooms[roomId];
};

const deleteRoom = (roomId) => {
  return delete rooms[roomId]; 
}

module.exports = {
  addRoom,
  isRoomExist,
  getRoom,
  addUserToRoom,
  removeUserFromRoom,
  getUsersInRoom,
  deleteRoom,
};
