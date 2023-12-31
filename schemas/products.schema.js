const Joi = require('joi')

const id = Joi.number().integer();
const name = Joi.string().min(3).max(40);
const description = Joi.string().min(3).max(200);
const price = Joi.number();
const image = Joi.string().uri();
const categoryId = Joi.number().integer();
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const price_min = Joi.number();
const price_max = Joi.number();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required()
})

const updateProductSchema = Joi.object({
  name,
  price,
  image,
  description,
  categoryId
})

const getProductSchema = Joi.object({
  id: id.required(),
})

const queryProductSchema = Joi.object({
    limit,
    offset,
    price,
    price_min,
    price_max
}).with('price_min', 'price_max').with('price_max', 'price_min')

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
