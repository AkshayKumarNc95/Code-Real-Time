const sql = require('mssql');

connectionPool = null;

function getConnection(){
    if(connectionPool){
        return connectionPool;
    };
    const connection = new sql.ConnectionPool({
        user: process.env.USER,
        password: process.env.PASSWORD,
        server: process.env.SERVER,
        database: process.env.DATABASE
    });

    connection.connect(err=>{
        console.log(err);
    });
    connectionPool = connection; 
    return connectionPool; 
}

module.exports = {getConnection}