const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    return User.create({
      _id: '12345',
      recipientEmail: 'canolowana6@gmail.com',
    });
  })
  .then(user => {
    console.log("✅ Test user created:", user);
    process.exit();
  })
  .catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
