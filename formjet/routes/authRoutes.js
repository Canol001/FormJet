const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user without manually setting _id
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    // Set session
    req.session.user = {
      userId: newUser._id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName
    };

    // Redirect to the dashboard
    res.redirect('/dashboard');  // Change this to the route where your dashboard is served
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
