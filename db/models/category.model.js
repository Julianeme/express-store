const { Model, DataTypes, Sequelize } = require('sequelize');

//1-Table name
const CATEGORY_TABLE = 'categories';

//2-Schema

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false
  },
  subcategory: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Category extends Model{
  static associate(){

}
  static config(sequelize){
    return{
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}

module.exports = {CATEGORY_TABLE, CategorySchema, Category};
