// routes/mailRoutes.js
const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');

// Route for sending the contact form data
router.post('/:userId', mailController.sendMail);

module.exports = router;
