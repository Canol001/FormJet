const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mailRoutes = require('./routes/mailRoutes');
const validateForm = require('./middleware/validateForm');

dotenv.config();

const app = express();
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static assets like CSS/JS/images
app.use(express.static(path.join(__dirname, 'public')));

// HTML Page Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/how-it-works', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'how-it-works.html'));
});

app.get('/example-form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'example-form.html'));
});

// Middleware to validate form
app.use('/send', validateForm);

// API Routes
app.use('/send', mailRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
