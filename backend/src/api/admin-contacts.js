const express = require('express');
const router = express.Router();
const { requireAuth, requireAdmin } = require('../middleware/auth');
const { ContactRequest } = require('../models');

router.use(requireAuth, requireAdmin);

router.get('/', async (req, res) => {
  try {
    const contacts = await ContactRequest.findAll({ order: [['id', 'DESC']] });
    res.json({ items: contacts.map((c) => ({ id: c.id, name: c.name, email: c.email, message: c.message, status: c.status })) });
  } catch (err) {
    res.json({ items: [] });
  }
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body || {};
  try {
    const c = await ContactRequest.findByPk(id);
    if (!c) return res.status(404).json({ error: 'Not found' });
    c.status = status || c.status;
    await c.save();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
