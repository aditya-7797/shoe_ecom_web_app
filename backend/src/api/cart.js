const express = require('express');
const router = express.Router();
const { getCart, addItem, updateItem, removeItem, checkout } = require('../services/cartService');

function getSessionId(req) {
  return req.headers['x-session-id'] || req.query.sessionId || (req.body && req.body.sessionId) || 'dev-session';
}

router.get('/', async (req, res) => {
  const sessionId = getSessionId(req);
  const cart = await getCart(sessionId);
  res.json(cart);
});

router.post('/add', async (req, res) => {
  const sessionId = getSessionId(req);
  const { productId, quantity = 1 } = req.body || {};
  const cart = await addItem(sessionId, Number(productId), Number(quantity));
  res.json(cart);
});

router.post('/update', async (req, res) => {
  const sessionId = getSessionId(req);
  const { productId, quantity } = req.body || {};
  const cart = await updateItem(sessionId, Number(productId), Number(quantity));
  res.json(cart);
});

router.post('/remove', async (req, res) => {
  const sessionId = getSessionId(req);
  const { productId } = req.body || {};
  const cart = await removeItem(sessionId, Number(productId));
  res.json(cart);
});

router.post('/checkout', async (req, res) => {
  const sessionId = getSessionId(req);
  const result = await checkout(sessionId);
  res.json(result);
});

module.exports = router;
