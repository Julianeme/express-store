const { ValidationError } = require('sequelize')
const boom = require('@hapi/boom')

// Code snippet from user.service.js

function handleSQLError (err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors[0].message
    })
  }
  next(err)
}

module.exports = { handleSQLError }
