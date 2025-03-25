// // utils/emailService.js
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'Gmail', // You can use any email service provider
//   auth: {
//     user: process.env.EMAIL_ID,
//     pass: jnduytsbmrlyflil, // Your email password or app-specific password
//   },
// });

// const sendEmail = async (to, subject, text, html) => {
//   try {
//     const info = await transporter.sendMail({
//       from: process.env.EMAIL,
//       to,
//       subject,
//       text,
//       html,
//     });
//     console.log('Email sent: ' + info.response);
//   } catch (error) {
//     console.error('Error sending email: ', error);
//   }
// };

// module.exports = sendEmail;


// utils/emailService.js
const fs = require('fs');
const path = require('path');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use any email service provider
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD, // Y // Your email password or app-specific password
  },
});

const sendEmail = async (to, subject, text, htmlFilePath, placeholders = {}) => {
  try {
    let html = fs.readFileSync(path.resolve(__dirname, htmlFilePath), 'utf8');

    // Replace placeholders in the template
    Object.keys(placeholders).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      html = html.replace(regex, placeholders[key]);
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
      html,
    });
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

module.exports = sendEmail;
