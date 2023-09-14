// This file is in charge of sending the configuration to the conections
// to the models

const ProductsService = require('../../services/products.service');
const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Order, OrderSchema } = require('./order.model');
const { Category, CategorySchema } = require('./category.model');
const {Customer, CustomerSchema} = require('./customer.model');

function setUpModels(sequelize){

  //INITS
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  //ASSOCIATIONS
  //here we associate the models passing the models to the associate function
  Customer.associate(sequelize.models)
  User.associate(sequelize.models)
  Category.associate(sequelize.models)
  Product.associate(sequelize.models)
  Order.associate(sequelize.models)
}

module.exports = setUpModels;
