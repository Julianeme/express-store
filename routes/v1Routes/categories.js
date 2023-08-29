const express = require('express')
const {faker} = require('@faker-js/faker')

const router = express.Router();

router.get('/', (req, res)=>{
  const size = req.query.size || 10;
  const categories = [];
  for (let index = 0; index < size; index++){
    categories.push({
      name: faker.commerce.department(),
    })
  }
  res.send(categories)
})

module.exports = router;
