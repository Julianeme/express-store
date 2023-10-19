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
    return {
      user,
      token
    };
  }

  async sendMail(email){
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const settings = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: 'ssl', // Use SSL/TLS for secure connection
      auth: {
        user: user.email,
        pass: config.emailPass, // Use your Gmail application-specific password
      },
    };
    const transporter = nodemailer.createTransport(settings);

    const message = {
      from: email,
      to: email,
      subject: 'HELLO WORLD! - TEST 2  EMAIL',
      text: 'This is another test email, using NodeMailer',
    };

      const info = await transporter.sendMail(message);
      return {
        message: 'mail sent'
      }
  }
}

module.exports = AuthService;
