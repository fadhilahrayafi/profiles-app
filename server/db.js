const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "ZXasqw12",
    host: "localhost",
    port: 5432,
    database: "glints"
});

module.exports = pool;