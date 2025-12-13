const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const data = require('../db/data');

// - Sugnup -
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await data.getUserByEmail(email);
        if (user) {
        // User already exists, then check password and login him
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: 'Wrong password' });

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }

    // If user doesn't exist
    // Create hash
    const hash = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await data.createUser(email, hash);

    // Creat JWT token
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// - Login -
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await data.getUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'No user found' });

    // Check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Wrong password' });

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;
