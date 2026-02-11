import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../src/App.jsx';

jest.mock('../../src/services/api.js', () => ({
  getProducts: async () => ({
    items: Array.from({ length: 16 }).map((_, i) => ({
      id: i + 1,
      modelName: `Shoe ${i + 1}`,
      description: 'Bold shoe for testing',
      price: 99 + i,
      rating: 4.2,
      imageUrl: null,
    })),
  }),
}));

/**
 * US2: Integration test for product grid rendering
 * - Renders Products route and verifies 16 cards exist
 */

test('products grid renders 16 cards', async () => {
  render(
    <MemoryRouter initialEntries={["/products"]}>
      <App />
    </MemoryRouter>
  );

  const grid = await screen.findByTestId('products-grid');
  const cards = grid.querySelectorAll('article');
  expect(cards.length).toBe(16);
});
