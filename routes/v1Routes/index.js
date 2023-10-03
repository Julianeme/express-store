const productsRouter = require('./products.router')
const usersRouter = require('./users.router')
const categoriesRouter = require('./categories.router')
const ordersRouter = require('./orders.router')
const customersRouter = require('./customers.router')
const authRouter = require('./auth.router')
const express = require('express')

function routerApiV1(app){
  //podemos utilizar nuevamente el router para gestionar un versionamiento
  //de la api en su ruta, como una ruta maestra, siguiendo el mismo procedimiento
  //que para la separacion de rutas
  const router = express.Router();
  app.use('/api/v1', router)
  // lo anterior crea una ruta raiz que sera usada con el router por los siguientes endpoints
  // NOTA: si no se usara asi, las rutas quedaria con la siguiente estructura
  // app.use('/api/v1/products', productsRouter);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter)
  router.use('/categories', categoriesRouter)
  router.use('/orders', ordersRouter)
  router.use('/customers', customersRouter)
  router.use('/auth', authRouter)
}

module.exports = routerApiV1
