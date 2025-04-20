const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: {
    type: String, // Accept string IDs like "12345"
    required: true,
  },
  recipientEmail: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('User', userSchema);
