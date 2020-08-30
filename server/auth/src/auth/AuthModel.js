const {getConnection} = require('../utils/mssqlTools'); 
const sql = require('mssql'); 
//SQL Connection pool; 
const pool = getConnection();


function checkUserToken(UserName, token){

    const cmd = `select count(u.id) cnt from users u
    inner join tokens t on t.user_id = u.id
    where UserName = '${UserName}' and t.token = '${token}'`;

    const rqt = new sql.Request(pool);

    return rqt.query(cmd);
}

module.exports = {checkUserToken};