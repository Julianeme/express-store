const{ Sequelize } = require('sequelize');
const { config } = require('./../config/config');
//import setUpModels from '../db/models to set up models
const setUpModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {dialect: 'postgres', logging: false});
//after instancing the conection -sequelize- it will call the function
//that will set up the model
setUpModels(sequelize);

//sequelize.sync() will create the tables if they don't exist
sequelize.sync();

//exporting the sequelize conection

module.exports = sequelize
