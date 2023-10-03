const boom = require('@hapi/boom');
const {config} = require('./../config/config');

function checkApiKey(req, res, next) {
  const headersApiKey = req.headers['api'];
  if (headersApiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

module.exports = { checkApiKey}
