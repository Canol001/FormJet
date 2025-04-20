// controllers/mailController.js
const mailService = require('../services/mailService');
const User = require('../models/User');

exports.sendMail = async (req, res) => {
  const { name, email, message } = req.body;
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    await mailService.sendMail({ name, email, message, userId });

    // Show styled response
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Message Sent</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body class="bg-gray-100 text-gray-800 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
          <h1 class="text-3xl font-bold text-green-600 mb-4">✅ Email Sent Successfully!</h1>
          
          <div class="text-left space-y-3 mt-6">
            <p><span class="font-semibold">To:</span> ${user.recipientEmail}</p>
            <p><span class="font-semibold">From:</span> ${email}</p>
            <p><span class="font-semibold">Name:</span> ${name}</p>
            <div>
              <p class="font-semibold mb-1">Message:</p>
              <p class="bg-gray-100 p-3 rounded border border-gray-300 text-gray-700 whitespace-pre-line">${message}</p>
            </div>
          </div>

          <a href="/" class="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">← Back to Form</a>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Error</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body class="bg-red-50 text-red-800 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow max-w-lg w-full text-center border border-red-300">
          <h1 class="text-2xl font-bold mb-4">❌ Failed to Send Email</h1>
          <p>Something went wrong. Please try again later.</p>
          <a href="/" class="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">← Back to Form</a>
        </div>
      </body>
      </html>
    `);
  }
};
