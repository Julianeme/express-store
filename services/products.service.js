const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')
const pool = require('../libs/postgres.pool')

class ProductsService{

  constructor(){
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate(){
    const size = 100;
    for (let index = 0; index < size; index++){
      this.products.push({
      id : faker.string.uuid(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
      blocked: faker.datatype.boolean()
    })
    }
  }

  async create(data){
    const newProduct = {
      id : faker.string.uuid(),
      ...
      data
    }
    this.products.push(newProduct)
    return (newProduct)
  }

  async find(){
    const query = 'SELECT * FROM tasks'
    const { rows } = await this.pool.query(query)
    return rows;
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
