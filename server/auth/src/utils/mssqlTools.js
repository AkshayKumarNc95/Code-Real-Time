const sql = require('mssql');

connectionPool = null;

function getConnection(){
    if(connectionPool){
        return connectionPool;
    };

    const connection = new sql.ConnectionPool({
        user: 'admin',
        password: 'admin1234$',
        server: 'localhost',
        database: 'AuthDB'
    });

    connection.connect(err=>{
        console.log(err);
    });
    connectionPool = connection; 
    return connectionPool; 
}

module.exports = {getConnection}