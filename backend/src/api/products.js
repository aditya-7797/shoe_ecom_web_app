const express = require('express');
const router = express.Router();
const { Product, ProductImage } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({ where: { status: 'active' }, order: [['id', 'ASC']] });
    const productIds = products.map((p) => p.id);
    const images = await ProductImage.findAll({ where: { product_id: productIds }, order: [['product_id', 'ASC'], ['order', 'ASC']] });

    const imagesByProduct = new Map();
    for (const img of images) {
      if (!imagesByProduct.has(img.product_id)) {
        imagesByProduct.set(img.product_id, []);
      }
      imagesByProduct.get(img.product_id).push({
        url: img.url,
        altText: img.altText,
        order: img.order
      });
    }

    const result = products.map((p) => ({
      id: p.id,
      modelName: p.modelName,
      description: p.description,
      price: p.price,
      rating: p.rating,
      images: imagesByProduct.get(p.id) || [],
      imageUrl: imagesByProduct.get(p.id)?.[0]?.url || null, // Backward compatibility
    }));

    res.json({ items: result });
  } catch (err) {
    // Resilient: return empty list if DB unavailable
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('GET /products failed:', err.message);
    }
    res.json({ items: [] });
  }
});

module.exports = router;
