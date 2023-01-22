require('dotenv').config();
const express = require('express');
const nodeMailer = require('nodemailer');

// init express
const app = express();

// middlewares
app.use(express.json()); // for parsing application/json

// mail transporter
const transporter = nodeMailer.createTransport({
  host: process.env.MAIL_SERVER,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// message post api
app.post('/messages', (req, res) => {
  const { name, email, message } = req.body;
  if(!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // mail options for sending mail
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_TO,
    subject: `Message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `
  };

  // send mail
  transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
    return res.status(200).json({ message: 'Email sent successfully' });
  });
});

// start server
app.listen(process.env.PORT ?? 8000, () => {
  console.log(`Server is running on port ${process.env.PORT ?? 8000}`)
});
