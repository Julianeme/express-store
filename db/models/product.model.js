const { Model, DataTypes, Sequelize } = require('sequelize');

//1-Table name
const PRODUCT_TABLE = 'products';

//2-Schema
const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: false,
    defaultValue: 0
    },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
    unique: false,
    defaultValue: 0
    },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
    unique: false,
    defaultValue: ''
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
};

class Product extends Model {
  static associate() {
    // associate
  }

  static config(sequelize) {
    return {
      //1-conection
      sequelize,
      //2-table name
      tableName: PRODUCT_TABLE,
      //3-model name
      modelName: 'Product',
      //4-timestamp: true or false
      timestamps: false
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
