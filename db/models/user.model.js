const {Model, DataTypes, Sequelize} = require('sequelize');

//1-Table name
const USER_TABLE = 'users';

//2-Schema
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    //following good practices, we will name the field created_at - with underscore -, this is
    //how it will be inserted and created in the database
    //but for javascript manipulation we will use camelCase (createdAt)
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class User extends Model{
  static associate(){

  }

  static config(sequelize){
    return{
      //1-conection
      sequelize,
      //2-table name
      tableName: USER_TABLE,
      //3-model name
      modelName: 'User',
      //4-timestamp: true or false
      timestamps: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User };

