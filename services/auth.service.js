const UserService = require('./user.service');
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {config} = require('../config/config')
const nodemailer = require('nodemailer')

const service = new UserService();

class AuthService {

  async getUser( email, password){
    const user = await service.findByEmail(email)
    if(!user){
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      throw boom.unauthorized();
    }
    delete user.dataValues.password
    return user
  }

  signToken(user){
    const payload = {
      sub: user.id,
      role: user.role
    };
    const token = jwt.sign(payload, config.jwtSecret);
    delete user.dataValues.recoveryToken
    return {
      user,
      token
    };
  }

  async sendPassRecoveryLink(email){
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.id,
    }
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'})
    const link = `http://myfrontend.com/recovery?token=${token}`
    await service.update(user.id, {recoveryToken: token})
    const message = {
      from: email,
      to: email,
      subject: 'password reset email',
      html: `<b>click on the following link to recover your password => ${link}</b>`
    };
    const response = await this.sendMail(message)
    return response
  }

  async sendMail(infoMail){
    const settings = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: 'ssl', // Use SSL/TLS for secure connection
      auth: {
        user: config.emailAddress,
        pass: config.emailPass, // Use your Gmail application-specific password
      },
    };
    const transporter = nodemailer.createTransport(settings);
    await transporter.sendMail(infoMail);
    return {
      message: 'mail sent'
    }
  }

  async changePassword(token, newPassword){
    try{
      const payload=jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if(user.recoveryToken !==token){
        throw boom.unauthorized();
      }
      //hash of the new password
      const hash = await bcrypt.hash(newPassword, 10);
      //update the new password in the DB and delete the recovery token
      await service.update(user.id, {recoveryToken: null, password: hash})
      return {message: 'Password successfully updated'}
{}    }catch(error){
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;
