
require('dotenv').config();
//this allows us to use the .env file

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  emailPass: process.env.MAIL_PASS,
  emailAddress: process.env.MAIL_ADDRESS,
  emailRecipient: process.env.MAIL_RECIPIENT,
};

 module.exports = {config};
