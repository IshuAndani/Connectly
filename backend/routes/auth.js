// routes/auth.js
const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/auth');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10), // Hash password before storing
    });

    if (user) {
      res.status(201).json({
        message: 'User created successfully',
        token: generateToken(user.id),
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      token: generateToken(user.id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

module.exports = router;
