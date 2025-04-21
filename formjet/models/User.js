const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  recipientEmail: { type: String, required: false }, // Optional
  userId: { type: String, unique: true, default: uuidv4 } // Using uuid for userId
});

const User = mongoose.model('User', userSchema);

module.exports = User;
