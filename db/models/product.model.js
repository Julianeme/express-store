const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');

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
  image: {
    allowNull: false,
    type: DataTypes.STRING,
    },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
    unique: false,
    defaultValue: ''
  },
  price: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  //one to many relationship goes on the weak element, in this case: products model
  categoryId:{
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {as: 'category'});
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId'
    })
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
