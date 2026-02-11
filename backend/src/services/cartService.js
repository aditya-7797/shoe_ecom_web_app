const { Cart, CartItem, Product } = require('../models');

// Fallback in-memory store when DB is unavailable
const memoryCarts = new Map();

async function getCart(sessionId) {
  try {
    const cart = await Cart.findOne({ where: { sessionId }, include: [{ model: CartItem, include: [Product] }] });
    if (!cart) return { items: [], subtotal: 0, total: 0 };
    const items = cart.CartItems.map((ci) => ({
      productId: ci.product_id,
      modelName: ci.Product?.modelName,
      qty: ci.quantity,
      price: Number(ci.unitPrice),
      lineTotal: Number(ci.lineTotal),
    }));
    const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
    return { items, subtotal, total: subtotal };
  } catch (err) {
    const m = memoryCarts.get(sessionId) || [];
    const subtotal = m.reduce((s, i) => s + i.price * i.qty, 0);
    return { items: m.map((i) => ({ ...i, lineTotal: i.price * i.qty })), subtotal, total: subtotal };
  }
}

async function addItem(sessionId, productId, quantity = 1) {
  try {
    let cart = await Cart.findOne({ where: { sessionId } });
    if (!cart) cart = await Cart.create({ sessionId });
    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Product not found');
    let item = await CartItem.findOne({ where: { cart_id: cart.id, product_id: productId } });
    if (item) {
      item.quantity += quantity;
      item.lineTotal = (Number(item.unitPrice) * item.quantity).toFixed(2);
      await item.save();
    } else {
      item = await CartItem.create({ cart_id: cart.id, product_id: productId, quantity, unitPrice: product.price, lineTotal: Number(product.price) * quantity });
    }
    return getCart(sessionId);
  } catch (err) {
    const m = memoryCarts.get(sessionId) || [];
    const idx = m.findIndex((i) => i.productId === productId);
    if (idx >= 0) {
      m[idx].qty += quantity;
    } else {
      m.push({ productId, modelName: `Product ${productId}`, qty: quantity, price: 99 });
    }
    memoryCarts.set(sessionId, m);
    return getCart(sessionId);
  }
}

async function updateItem(sessionId, productId, quantity) {
  try {
    let cart = await Cart.findOne({ where: { sessionId } });
    if (!cart) throw new Error('Cart not found');
    let item = await CartItem.findOne({ where: { cart_id: cart.id, product_id: productId } });
    if (!item) throw new Error('Item not found');
    item.quantity = quantity;
    item.lineTotal = (Number(item.unitPrice) * item.quantity).toFixed(2);
    await item.save();
    return getCart(sessionId);
  } catch (err) {
    const m = memoryCarts.get(sessionId) || [];
    const idx = m.findIndex((i) => i.productId === productId);
    if (idx >= 0) m[idx].qty = quantity;
    memoryCarts.set(sessionId, m);
    return getCart(sessionId);
  }
}

async function removeItem(sessionId, productId) {
  try {
    let cart = await Cart.findOne({ where: { sessionId } });
    if (!cart) throw new Error('Cart not found');
    await CartItem.destroy({ where: { cart_id: cart.id, product_id: productId } });
    return getCart(sessionId);
  } catch (err) {
    const m = memoryCarts.get(sessionId) || [];
    memoryCarts.set(sessionId, m.filter((i) => i.productId !== productId));
    return getCart(sessionId);
  }
}

async function checkout(sessionId) {
  const summary = await getCart(sessionId);
  // In a real app, create order record. For MVP, just clear.
  try {
    let cart = await Cart.findOne({ where: { sessionId } });
    if (cart) {
      await CartItem.destroy({ where: { cart_id: cart.id } });
    }
  } catch (_) {
    memoryCarts.set(sessionId, []);
  }
  return { confirmed: true, summary };
}

module.exports = { getCart, addItem, updateItem, removeItem, checkout };
