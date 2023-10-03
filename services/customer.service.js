const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');


class CustomerService {

  constructor() {
  }

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  };

  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  // This would a step by step process, but sequelize can do all this process
  // internally as it already knows that there is a association names user
  // and can used it to create the customer as seen on the uncommented endpoint
  // async create(data) {
  //   const newUser = await models.User.create(data.user);
  //   const newCustomer = await models.Customer.create({
  //   ...data,
  //   userId: newUser.id
  //   });
  //   return (newCustomer);
  // }

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
        }
    }
    const newCustomer = await models.Customer.create(newData, {
      include: ['user'],
    });
    delete newCustomer.dataValues.user.dataValues.password;
  return (newCustomer);
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
