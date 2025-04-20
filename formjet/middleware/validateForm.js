// middleware/validateForm.js
module.exports = (req, res, next) => {
    const { name, email, message } = req.body;
  
    if (!name || !email || !message) {
      return res.status(400).send('All fields are required.');
    }
  
    next(); // If validation passes, proceed to the next middleware/controller
  };
  