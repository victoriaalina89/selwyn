 async function getDBConnection() {
    const connection = await mysql.createConnection({
        host: process.env.SELWYN_DB_HOST,
        port: process.env.SELWYN_DB_PORT,
        user: process.env.SELWYN_DB_USER,
        password: process.env.SELWYN_DB_PASS,
        database: process.env.SELWYN_DB_DATABASE
    });
}

module.exports = getDBConnection;