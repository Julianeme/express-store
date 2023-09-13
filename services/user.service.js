const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');
// since we are using sequelize , getConnection is not longer required
// const getConnection = require('../libs/postgres');


class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));

  }

  async create(data) {
    const newUser = await models.User.create(data);
    return {
      id: newUser.id,
      email: newUser.email
    };
  }

  async find() {
    const response = await models.User.findAll({
      include: ['customer']
    });
    return response;
  }


  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('User Not Found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const updatedUser = await user.update(changes);
    return {
      id,
      updatedUser};
    }

  async delete(id) {
    const userToDelete = await this.findOne(id);
    await userToDelete.destroy();
    return id
  }
}

module.exports = UserService;
