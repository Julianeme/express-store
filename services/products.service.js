const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')
// We wont longer use pool instead we will used sequelize ORM
// const pool = require('../libs/postgres.pool')
// const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');
const { query } = require('express');
const { Op } = require('sequelize');

class ProductsService{

  constructor(){
    // when using sequelize we wont need to use pool
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }

    async create(data){
    const newProduct = await models.Product.create(data)
    return (newProduct)
  }

  async find(query){
    // when we want to use a sql query we will use sequelize.query
    //const query = 'SELECT * FROM tasks'
    //const [data] = await sequelize.query(query)
    const options = {
      include: ['category'],
      where: {}
    };
    const {limit, offset} = query
    if(limit && offset){
      {
      options.limit =limit,
      options.offset = offset
    }};
    const {price} = query
    if(price){
      options.where.price = price
    }
    const {price_min, price_max} = query
    if(price_min && price_max){
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      }
    }
    console.log(options)
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id)
    if(!product){
      throw boom.notFound('Product Not Found');
    }
    if(product.blocked){
            throw boom.conflict('Product is blocked');
    }
    return product;
  }

 async update(productId, updatedInfo){
    let index = this.products.findIndex(item => item.id ===productId);
    const product = this.products[index]
    if(index === -1){
      throw boom.notFound('Product Not Found')
    }else{
      this.products[index] = {
        ...product,
        ...updatedInfo
      }
    }
    return this.products[index]
  }

  async delete(productId){
    let index = this.products.findIndex(item => item.id ===productId)
    if(index ===-1){
      throw boom.notFound('Product Not Found')
    }else{
      this.products.splice(index,1)
    }
    return (`Product id ${productId}, successfully deleted`)
  }
}

module.exports = ProductsService
