const productsRouterV2 = require('../v2Routes/productsV2')
const express = require('express')

//Si quisieramos manejar un ruteo V2 para nuestra api, creariamos otra funcion
//que maneje dicho ruteo de forma similar a la anterior.
function routerApiv2(app){
  const router = express.Router();
  app.use('/api/v2', router)
  router.use('/products', productsRouterV2);
}
module.exports = routerApiv2
