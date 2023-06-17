/*
with tedious
var Connection = require('tedious').Connection;
var config = {
    server: 'DESKTOP-885LHT4\\SQLEXPRESS',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'sa', //update me
            password: '123'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'UTM'  //update me
    }
};
var connection = new Connection(config);
connection.on('connect', function(err) {
    // If no error, then good to proceed.
    console.log("Connected");
});

connection.connect();

module.exports = {
    Connection,connection
}
*/


const sql = require('mssql')
const sqlConfig = {
    user: 'sa',
    password: '123456',
    database: 'UTM',
    server: 'PUNIT',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

conectiontest = async () => {
    const poolPromise = new sql.ConnectionPool(sqlConfig);
    poolPromise.connect((error, connection) => {
        if (error != null)
            console.log('err', error);
        else if (connection != null)
            // console.log('connection', connection);
            console.log('Connected to database')
        else
            console.log('none')
    })
    return poolPromise;


}
var poolpromise = conectiontest();

module.exports =
    {
        sql,poolpromise
    }