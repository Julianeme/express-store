const Joi = require('joi')

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const ProductId = Joi.number().integer();
const amount = Joi.number().integer().min(1);
const status = Joi.string().valid('created', 'pending','ready', 'cancelled', 'dispatched', 'returned', 'delivered');

const getOrderSchema = Joi.object({
    id
})

const createOrderSchema = Joi.object({
  customerId,
  status
})

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: ProductId.required(),
  amount: amount.required()
})
module.exports = { createOrderSchema, addItemSchema, getOrderSchema };
