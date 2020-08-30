"use strict";

var _require = require("../utils/mssqlTools"),
    getConnection = _require.getConnection;

var sql = require("mssql");

var _require2 = require("debug"),
    log = _require2.log; //SQL Connection pool;


var pool = getConnection();

function checkUser(UserName) {
  try {
    var cmd = "select id id, password pwd from Users where user_name = '".concat(UserName, "'");
    var rqt = new sql.Request(pool);
    return rqt.query(cmd);
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

function saveToken(token, userId) {
  //ToDo- Logic to delete tokens if there are more than 5 tokens for an user!
  var cmd = "insert into tokens values('".concat(token, "', ").concat(userId, ")");
  var rqt = new sql.Request(pool);
  return rqt.query(cmd);
}

module.exports = {
  checkUser: checkUser,
  saveToken: saveToken
};