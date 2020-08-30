const { getConnection } = require("../utils/mssqlTools");
const sql = require("mssql");
const { log } = require("debug");
//SQL Connection pool;
const pool = getConnection();

function checkUser(UserName) {
  try {
    const cmd = `select id id, password pwd from Users where user_name = '${UserName}'`;

    const rqt = new sql.Request(pool);

    return rqt.query(cmd);
  } catch(err) {
      console.log(err.message);
      throw err;
  }
}

function saveToken(token, userId) {
  //ToDo- Logic to delete tokens if there are more than 5 tokens for an user!

  const cmd = `insert into tokens values('${token}', ${userId})`;

  const rqt = new sql.Request(pool);

  return rqt.query(cmd);
}

module.exports = { checkUser, saveToken };
