import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from '../../src/pages/ProductDetail.jsx';

jest.mock('../../src/services/api.js', () => ({
  getProductDetail: async (id) => ({
    id: Number(id),
    modelName: 'Nova Runner',
    description: 'Comfortable, stylish, and durable.',
    price: 99.99,
    rating: 4.5,
    images: [
      { url: 'https://picsum.photos/seed/pd-1/640/480', altText: 'Nova Runner image 1', order: 1 },
      { url: 'https://picsum.photos/seed/pd-2/640/480', altText: 'Nova Runner image 2', order: 2 },
      { url: 'https://picsum.photos/seed/pd-3/640/480', altText: 'Nova Runner image 3', order: 3 },
    ],
  }),
  getReviews: async () => ({ items: [{ id: 1, rating: 5, title: 'Great', body: 'Very comfy', author: 'Alex' }] }),
}));

/**
 * US3: Integration test for detail page gallery and CTAs
 */

test('product detail renders gallery and CTAs', async () => {
  render(
    <MemoryRouter initialEntries={["/products/1"]}>
      <Routes>
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </MemoryRouter>
  );

  // Heading
  const heading = await screen.findByRole('heading', { name: /Nova Runner/i });
  expect(heading).toBeInTheDocument();

  // Gallery section
  expect(screen.getByLabelText(/Product image gallery/i)).toBeInTheDocument();

  // CTAs
  expect(screen.getByRole('button', { name: /Add to Cart/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Buy Now/i })).toBeInTheDocument();

  // Reviews heading
  expect(screen.getByRole('heading', { name: /Reviews/i })).toBeInTheDocument();
});
