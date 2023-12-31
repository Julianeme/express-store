const{ Sequelize } = require('sequelize');
const { config } = require('./../config/config');
//import setUpModels from '../db/models to set up models
const setUpModels = require('./../db/models');

const options = {
  dialect: 'postgres',
    logging: config.isProd ? false : true,
}

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}
//to use the db with postgress use the following 2 lines of code

const sequelize = new Sequelize(config.dbUrl, options);

//to use the db with mysql use the following 2 lines of code
//const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
//const sequelize = new Sequelize(URI, {dialect: 'mysql', logging: false});
//after instancing the conection -sequelize- it will call the function
//that will set up the model
setUpModels(sequelize);

//sequelize.sync() will create the tables if they don't exist, should be used only the first time
//the tables are created, after we will only use migrations to update the tables
//sequelize.sync();

//exporting the sequelize conection

module.exports = sequelize
