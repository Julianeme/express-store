const express = require('express');
const ProductsService = require('../../services/products.service')
const validatorHandler = require('../../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../../schemas/products.schema')

//ya que aca vamos a crear un router, usamos router."operacion"
//en vez de app."operacion"
const router = express.Router();
const service = new ProductsService();


//como el /products seria una especie de "home" al router products.js
//entonces lo declaramos solo como '/' y para los endpoints que lo usan
//seria igual, por ejempolo /products/filter --> /filter

// router.get('/', async (req, res) => {
//       const products = await service.find();
//   res.json(products)
// });

router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res) => {
  try {
    const products = await service.find(req.query);
    // Sending the HTML response
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

//Este endpoint chocaria con el que le sigue, para evitarlo, se ponen los filtros especificos como
//este antes de los dinamicos como 'products/:id'

router.get('/filter', (req, res)=>{
  res.send('I am a filter')
})


router.get('/:id', validatorHandler(getProductSchema, 'params'),
  async (req, res, next)=>{
    const id = req.params.id
    console.log(req.params)
    console.log("REQ: ", req)
    try {
      const product = await service.findOne(id)
      res.json(product)
    }catch(err){
      next(err)
    }
})

router.post('/', validatorHandler(createProductSchema, 'body'),
 async (req, res,next)=>{
  const body = req.body;
  try{
    const product = await service.create(body)
    res.status(201).json({
      message: ' Product Successfully Created',
      //Este data no sera recibido en la respuesta si no se
      //implementa un middleware en el index del root
      // app.use(express.json())
      data: product
    })
  } catch (err){
    next(err)
  }
})

router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next)=>{
    try{
    const productID = req.params.id
    const body = req.body;
    const updatedProduct = await service.update(productID, body)
    res.json(updatedProduct)
  } catch(err){
    next(err)
  }
})

router.patch('/:productId',
validatorHandler(getProductSchema, 'params'),
async (req, res)=>{
try {  const body = req.body;
  const { productId } = req.params
  res.json({
    message: ' Product Partial Update Successful ',
    data: body,
    productId
  })} catch (err){
    next(err)
  }
})

router.delete('/:productId',
validatorHandler(getProductSchema, 'params'),
async (req, res)=>{
  try{
    const { productId } = req.params
  const productToDelete = service.delete(productId)
  res.json({productToDelete})
  } catch (err){
    next(err)
  }
})

module.exports = router;
