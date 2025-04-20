// config/mail.js
require('dotenv').config();  // Ensures environment variables are loaded

module.exports = {
  host: process.env.SMTP_HOST, // Should be 'smtp.gmail.com'
  port: process.env.SMTP_PORT, // Should be 587 (or 465 for SSL)
  user: process.env.SMTP_USER, // Your email address
  pass: process.env.SMTP_PASS, // Your email app password
};
