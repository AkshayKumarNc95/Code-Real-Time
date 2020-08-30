const {getConnection} = require('../utils/mssqlTools');
const sql = require('mssql'); 
const { Connection } = require('tedious');
//SQL Connection pool; 
const pool = getConnection();



//functiontion to validate the username
function validateUserName(userName){

    // SQL query! 
    let cmd = `select count(id) cnt from users where user_name =  '${userName}'`; 

    const rqt = new sql.Request(pool); 
    return rqt.query(cmd); 
}

function saveUser(user){
    const rqt = new sql.Request(pool);
    rqt.input('first_name',sql.VarChar(255) , user.FirstName); 
    rqt.input('last_name',sql.VarChar(255) , user.LastName); 
    rqt.input('user_name',sql.VarChar(255) , user.UserName); 
    
    rqt.input('email',sql.VarChar(255) , user.Email); 
    
    rqt.input('password',sql.VarChar(255) , user.Password); 

    return rqt.query('insert into users(first_name, last_name, user_name, password, email) values(@first_name, @last_name, @user_name, @password, @email)', user);
}
module.exports = {validateUserName, saveUser}; 