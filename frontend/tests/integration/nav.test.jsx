import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// Mock API to avoid import.meta usage during tests
jest.mock('../../src/services/api.js', () => ({
  getProducts: async () => ({ items: [] }),
}));
import App from '../../src/App.jsx';

/**
 * US1: Integration test for navbar routes
 * - Verifies links render
 * - Navigates to About and Contact pages
 */

test('navbar renders and routes to About and Contact', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // Links exist
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('About Us')).toBeInTheDocument();
  expect(screen.getByText('Products')).toBeInTheDocument();
  expect(screen.getByText('Contact Us')).toBeInTheDocument();

  // Navigate to About
  fireEvent.click(screen.getByText('About Us'));
  expect(screen.getByRole('heading', { name: /About Us/i })).toBeInTheDocument();

  // Navigate to Contact
  fireEvent.click(screen.getByText('Contact Us'));
  expect(screen.getByRole('heading', { name: /Contact Us/i })).toBeInTheDocument();
});
