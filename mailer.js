const nodemailer = require('nodemailer');
const { config } = require('./config/config');

async function deliverMail() {
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

  const message = {
    from: config.emailAddress,
    to: config.emailRecipient,
    subject: 'HELLO WORLD! - TEST 2  EMAIL',
    text: 'This is another test email, using NodeMailer',
  };

  try {
    const info = await transporter.sendMail(message);
    console.log('Message sent: %s', info.messageId);
    console.log('Message info: %s', info);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
}

deliverMail();
