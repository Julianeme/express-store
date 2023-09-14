const Joi = require('joi')
const { getCustomerSchema } = require('./customer.schema')


const id = Joi.number().integer();
const customerId = Joi.number().integer();

const getOrderSchema = Joi.object({
    id
})

const createOrderSchema = Joi.object({
  customerId
})

const updateOrderSchema = Joi.object({
  id,
})
module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema};
