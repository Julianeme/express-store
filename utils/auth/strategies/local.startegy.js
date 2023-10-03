const {Strategy} = require('passport-local');
const UserServices = require('./../../../services/user.service')
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const service = new UserServices();

const LocalStrategy = new Strategy(async (email, password, done)=>{
  try {
    const user = await service.findByEmail(email)
    if(!user){
       done(boom.unauthorized(), false)
    }
    const isAMatch = await bcrypt.compare(password, user.password);
    if(!isAMatch){
      done(boom.unauthorized(), false);
    }
    delete user.dataValues.password
    done(null, user)
  }catch(error){
    done(error, false)
  }
});

module.exports = LocalStrategy;
