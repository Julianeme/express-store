const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize')

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOneCategory(id) {
    const category = await models.Category.findByPk(id);
    return category;
  }


  async findAllProductsByCategoryId(id){
    const categoryProducts = await models.Category.findByPk(id, {
      include: ['products'],
  })
    return categoryProducts
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = CategoryService;
