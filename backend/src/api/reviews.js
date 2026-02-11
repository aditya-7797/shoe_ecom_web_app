const express = require('express');
const router = express.Router();
const { Review } = require('../models');

// GET /api/reviews?productId=123
router.get('/', async (req, res) => {
  const productId = Number(req.query.productId);
  if (!Number.isFinite(productId)) return res.status(400).json({ error: 'Invalid productId' });
  try {
    const reviews = await Review.findAll({ where: { product_id: productId }, order: [['date', 'DESC']] });
    res.json({ items: reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      title: r.title,
      body: r.body,
      author: r.author,
      date: r.date,
    })) });
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('GET /reviews failed:', err.message);
    }
    res.json({ items: [] });
  }
});

module.exports = router;
