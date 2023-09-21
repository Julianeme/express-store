const { Pool } = require('pg');
const { config } = require('../config/config');

const options = {}

if(config.isProd){
  options.connectionString = config.dbUrl;
   options.ssl = {
    rejectUnauthorized: false,
   }
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
   options.connectionString = URI;

}

//All sensitive environment variables to be sent will be protected
// by encryption and decryption methods.


//This is the connection string parameter is recognized by postgres and
//will be used to connect to the database.

const pool = new Pool(options);


module.exports = pool;
