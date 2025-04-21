const express = require('express');
const router = express.Router();

// You can replace this with database logic later
const users = [];

router.post('/register', (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Optional: check if user already exists (mock check)
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(409).json({ message: 'User already registered' });
  }

  // Save user (mock)
  users.push({ firstName, lastName, email, phone, password });

  console.log('Registered user:', { firstName, lastName, email, phone });
  res.status(200).json({ message: 'Registration successful!' });
});

module.exports = router;
