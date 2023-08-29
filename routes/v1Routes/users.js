const express = require('express')
const { faker } = require('@faker-js/faker')

const router = express.Router();


router.get('/', (req, res)=>{
  const size = req.query.size || 10
  const users = [];
  for (let index = 0; index < size; index++){
    users.push({
      user: faker.person.firstName(),
    })
  }
  res.send(users)
})

module.exports = router;
