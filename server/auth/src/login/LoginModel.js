const {getConnection} = require('../utils/mssqlTools');
const sql = require('mssql'); 
//SQL Connection pool; 
const pool = getConnection();


function checkUser(user_name){

    const cmd = `select id id, password pwd from Users where user_name = '${user_name}'`; 

    const rqt = new sql.Request(pool);
    
    return rqt.query(cmd);
};


function saveToken(token, userId){

    //ToDo- Logic to delete tokens if there are more than 5 tokens for an user! 

    const cmd = `insert into tokens values('${token}', ${userId})`;

    const rqt = new sql.Request(pool);

    return rqt.query(cmd);
}



module.exports = {checkUser, saveToken}