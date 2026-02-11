const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { User } = require('../models');
const { hashPassword, comparePassword } = require('../utils/auth');
const { signToken } = require('../utils/jwt');

function sendValidationErrors(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
}

router.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').isLength({ min: 1 }),
  async (req, res) => {
    const e = sendValidationErrors(req, res);
    if (e) return e;
    const { name, email, password } = req.body;
    try {
      const existing = await User.findOne({ where: { email } });
      if (existing) return res.status(409).json({ error: 'Email already registered' });
      const passwordHash = await hashPassword(password);
      const user = await User.create({ name, email, passwordHash, role: 'user' });
      const token = signToken({ id: user.id, email: user.email, role: user.role });
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error('POST /auth/signup failed:', err.message);
      }
      res.status(500).json({ error: 'Server error' });
    }
  }
);

router.post(
  '/admin-signup',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').isLength({ min: 1 }),
  async (req, res) => {
    const e = sendValidationErrors(req, res);
    if (e) return e;
    const { name, email, password } = req.body;
    try {
      const existing = await User.findOne({ where: { email } });
      if (existing) return res.status(409).json({ error: 'Email already registered' });
      const passwordHash = await hashPassword(password);
      const user = await User.create({ name, email, passwordHash, role: 'admin' });
      const token = signToken({ id: user.id, email: user.email, role: user.role });
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error('POST /auth/admin-signup failed:', err.message);
      }
      res.status(500).json({ error: 'Server error' });
    }
  }
);

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const e = sendValidationErrors(req, res);
    if (e) return e;
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });
      const ok = await comparePassword(password, user.passwordHash);
      if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
      const token = signToken({ id: user.id, email: user.email, role: user.role });
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error('POST /auth/login failed:', err.message);
      }
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
