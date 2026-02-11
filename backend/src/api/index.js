const express = require('express');
const router = express.Router();
const productsRouter = require('./products');
const productDetailRouter = require('./product-detail');
const reviewsRouter = require('./reviews');
const cartRouter = require('./cart');
const authRouter = require('./auth');
const adminProductsRouter = require('./admin-products');
const adminContactsRouter = require('./admin-contacts');
const { ContactRequest } = require('../models');

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Public contact submission
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  try {
    const contact = await ContactRequest.create({ name, email, message, status: 'new' });
    res.status(201).json({ ok: true, id: contact.id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.use('/products', productsRouter);
router.use('/products', productDetailRouter);
router.use('/reviews', reviewsRouter);
router.use('/cart', cartRouter);
router.use('/auth', authRouter);
router.use('/admin/products', adminProductsRouter);
router.use('/admin/contacts', adminContactsRouter);

module.exports = router;
