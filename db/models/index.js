// This file is in charge of sending the configuration to the conections
// to the models

const ProductsService = require('../../services/products.service');
const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Order, OrderSchema } = require('./order.model');
const { Category, CategorySchema } = require('./category.model');

function setUpModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));

}

module.exports = setUpModels;
