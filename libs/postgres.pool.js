const { Pool } = require('pg');
const { config } = require('../config/config');

//All sensitive environment variables to be sent will be protected
// by encryption and decryption methods.

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//This is the connection string parameter is recognized by postgres and
//will be used to connect to the database.
const pool = new Pool({ connectionString: URI});


module.exports = pool;
