const {getConnection} = require('../utils/mssqlTools'); 
const sql = require('mssql'); 
//SQL Connection pool; 
const pool = getConnection();



function removeUserToken(UserName, token){

    const cmd = `delete from tokens where user_id = (select id from users where UserName = '${UserName}') and token = '${token}'`;

    const rqt = new sql.Request(pool);

    return rqt.query(cmd);
}

module.exports = {removeUserToken};