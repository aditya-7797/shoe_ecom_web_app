export function addToCart(product) {
  const key = 'cart_items';
  const items = JSON.parse(localStorage.getItem(key) || '[]');
  items.push({ id: product.id, qty: 1, price: product.price, modelName: product.modelName });
  localStorage.setItem(key, JSON.stringify(items));
  return items.length;
}

export function buyNow(product) {
  // For MVP: just add to cart and return a flag; real flow will navigate to checkout
  const count = addToCart(product);
  return { added: true, count };
}
