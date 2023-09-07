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
    return data;
  }

  async find() {
    const response = models.User.findAll();
    return response;
  }


  async findOne(id) {
    const query = `SELECT * FROM tasks WHERE id=${id}`;
    const {rows} = await this.pool.query(query);
    if(!rows[0]){
      throw boom.notFound('Task Not Found');
    }
    return rows[0];
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

module.exports = UserService;
