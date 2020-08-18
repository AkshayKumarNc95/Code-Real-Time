const {getConnection} = require('../utils/mssqlTools'); 
const sql = require('mssql'); 
//SQL Connection pool; 
const pool = getConnection();



function removeUserToken(user_name, token){

    const cmd = `delete from tokens where user_id = (select id from users where user_name = '${user_name}') and token = '${token}'`;

    const rqt = new sql.Request(pool);

    return rqt.query(cmd);
}

module.exports = {removeUserToken};