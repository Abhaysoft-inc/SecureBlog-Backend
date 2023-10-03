const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password, fullname, mobile } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, fullname,mobile });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Login
// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user._id }, 'mysecretkeyyy', {
      expiresIn: '1h',
    });
    req.session.user = {
      userId: user._id,
      username: user.username,
    };
    
    // Send the username back in the response JSON
    res.status(200).json({ token, username: user.username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// logout

router.post('/logout', (req, res) => {
  try {
    // Destroy the session to log the user out
    req.session.destroy();

    // Optionally, you can also clear the client-side token
    // by removing it from local storage
    // localStorage.removeItem('token');

    // Send a response indicating successful logout
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    console.log(error);
    res.status(500).json({ error: 'Logout failed' });
  }
});


module.exports = router;
