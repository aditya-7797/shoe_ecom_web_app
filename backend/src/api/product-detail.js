const express = require('express');
const router = express.Router();
const { Product, ProductImage } = require('../models');

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: 'Invalid product id' });
  try {
    const product = await Product.findByPk(id);
    if (!product || product.status !== 'active') return res.status(404).json({ error: 'Not found' });
    const images = await ProductImage.findAll({ where: { product_id: id }, order: [['order', 'ASC']] });
    res.json({
      id: product.id,
      modelName: product.modelName,
      description: product.description,
      price: product.price,
      rating: product.rating,
      images: images.map((img) => ({ url: img.url, altText: img.altText, order: img.order })),
    });
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('GET /products/:id failed:', err.message);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
