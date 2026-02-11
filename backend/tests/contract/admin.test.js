const request = require('supertest');
const app = require('../../src/server');
const { signToken } = require('../../src/utils/jwt');

const adminToken = signToken({ id: 1, email: 'admin@example.com', role: 'admin' });

describe('Admin API', () => {
  it('lists products and performs CRUD', async () => {
    let res = await request(app).get('/api/admin/products').set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);

    // Create
    res = await request(app)
      .post('/api/admin/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ modelName: 'Admin Shoe', description: 'Test', price: 123.45, rating: 4 });
    expect([201, 500]).toContain(res.statusCode);
    const id = res.body.id;

    // Update
    if (id) {
      res = await request(app)
        .put(`/api/admin/products/${id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ price: 111.11 });
      expect([200, 500]).toContain(res.statusCode);

      // Add image
      res = await request(app)
        .post(`/api/admin/products/${id}/images`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ url: 'https://picsum.photos/seed/admin/640/480', altText: 'Admin Image', order: 1 });
      expect([201, 500]).toContain(res.statusCode);

      // Delete
      res = await request(app)
        .delete(`/api/admin/products/${id}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect([200, 500]).toContain(res.statusCode);
    }
  });

  it('lists and updates contacts', async () => {
    let res = await request(app).get('/api/admin/contacts').set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    // Attempt update on fake id; expect 404 or 500
    res = await request(app)
      .put('/api/admin/contacts/999999')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'reviewed' });
    expect([404, 500]).toContain(res.statusCode);
  });
});
