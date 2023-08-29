const express = require('express');
const router = express.Router();


router.get('/', (req, res)=>{
  res.send('<h1>ESTE ES EL ENDPOINT PARA V2 DE LA API</h1>')
})


module.exports = router;
