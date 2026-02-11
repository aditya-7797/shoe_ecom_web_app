const express = require('express');
const router = express.Router();
const { requireAuth, requireAdmin } = require('../middleware/auth');
const { Product } = require('../models');
const { addImage, deleteImage, deleteImagesForProduct } = require('../services/productImageService');

router.use(requireAuth, requireAdmin);

// List products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['id', 'ASC']] });
    res.json({ items: products.map((p) => ({
      id: p.id,
      modelName: p.modelName,
      description: p.description,
      price: p.price,
      rating: p.rating,
      status: p.status,
    })) });
  } catch (err) {
    res.json({ items: [] });
  }
});

// Create product
router.post('/', async (req, res) => {
  const { modelName, description, price, rating = 0, status = 'active' } = req.body || {};
  try {
    const p = await Product.create({ modelName, description, price, rating, status });
    res.status(201).json({ id: p.id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const p = await Product.findByPk(id);
    if (!p) return res.status(404).json({ error: 'Not found' });
    const { modelName, description, price, rating, status } = req.body || {};
    if (modelName !== undefined) p.modelName = modelName;
    if (description !== undefined) p.description = description;
    if (price !== undefined) p.price = price;
    if (rating !== undefined) p.rating = rating;
    if (status !== undefined) p.status = status;
    await p.save();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete product (and images)
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await deleteImagesForProduct(id);
    const n = await Product.destroy({ where: { id } });
    if (!n) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add image
router.post('/:id/images', async (req, res) => {
  const id = Number(req.params.id);
  const { url, altText = '', order = 1 } = req.body || {};
  try {
    const p = await Product.findByPk(id);
    if (!p) return res.status(404).json({ error: 'Not found' });
    const img = await addImage(id, { url, altText, order });
    res.status(201).json({ id: img.id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete image
router.delete('/:id/images/:imageId', async (req, res) => {
  const imageId = Number(req.params.imageId);
  try {
    const ok = await deleteImage(imageId);
    if (!ok) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
