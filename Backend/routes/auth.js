const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err || !user) return res.status(400).json({ message: 'Invalid credentials' });
    if (!bcrypt.compareSync(password, user.password)) return res.status(400).json({ message: 'Invalid credentials' });
    req.session.user = { id: user.id, username: user.username, role: user.role };
    res.json({ message: 'Login successful', role: user.role });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
});

router.get('/me', (req, res) => {
  if (req.session.user) res.json(req.session.user);
  else res.status(401).json({ message: 'Not authenticated' });
});

module.exports = router;
