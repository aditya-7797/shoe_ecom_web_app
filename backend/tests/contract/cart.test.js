const request = require('supertest');
const app = require('../../src/server');

describe('Cart API', () => {
  const sessionId = 'test-session';
  it('gets empty cart', async () => {
    const res = await request(app).get('/api/cart').set('x-session-id', sessionId);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('items');
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  it('adds, updates, removes, and checks out', async () => {
    // Add item
    let res = await request(app).post('/api/cart/add').send({ sessionId, productId: 1, quantity: 2 });
    expect(res.statusCode).toBe(200);
    expect(res.body.items.length).toBeGreaterThanOrEqual(1);

    // Update quantity
    res = await request(app).post('/api/cart/update').send({ sessionId, productId: 1, quantity: 3 });
    expect(res.statusCode).toBe(200);

    // Remove
    res = await request(app).post('/api/cart/remove').send({ sessionId, productId: 1 });
    expect(res.statusCode).toBe(200);

    // Checkout
    res = await request(app).post('/api/cart/checkout').send({ sessionId });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('confirmed', true);
  });
});
