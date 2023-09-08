const boom = require('@hapi/boom')

function validatorHandler (schema, property){
  return (req, res, next) => {
    //Lo siguiente, permite de forma dinamica decirle al programa
    //donde esta la propiedad que queremos validar, como en el body (en caso de put, post)
    //o params en el caso de un get
    const data = req[property]
    const {error} = schema.validate(data, {abortEarly: false});
    if(error){
      next(boom.badRequest(error));
    }
    next();
  }
}


module.exports = validatorHandler;
