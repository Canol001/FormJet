const nodemailer = require('nodemailer');
const mailConfig = require('../config/mail');
const User = require('../models/User');

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: mailConfig.host,
  port: Number(mailConfig.port),
  secure: false,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.pass,
  },
});

exports.sendMail = async ({ name, email, message, userId }) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
        <h2 style="color: #2c3e50;">📩 New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Name</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Email</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Message</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${message}</td>
          </tr>
        </table>
        <p style="margin-top: 30px; font-size: 12px; color: #888;">This email was sent via FormJet 📬</p>
      </div>
    `;

    const mailOptions = {
      from: email,
      to: user.recipientEmail,
      subject: `Contact Form Submission from ${name}`,
      text: message, // Fallback for non-HTML clients
      html: htmlBody,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${user.recipientEmail}`);
  } catch (error) {
    throw new Error('Failed to send email: ' + error.message);
  }
};
