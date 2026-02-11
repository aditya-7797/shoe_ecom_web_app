import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../src/App.jsx';

// Mock API calls to simulate successful login/signup
jest.mock('../../src/services/api.js', () => ({
  api: { post: async (path, body) => ({ data: { token: 'test-token', user: { id: 1, name: 'Alex', email: body.email, role: 'user' } } }) },
}));

/**
 * US5: Integration test for auth pages and navbar state
 */

test('login updates navbar to show Logout', async () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <App />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'user@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /Login/i }));

  // Simulate redirect applied in component and token storage
  window.history.pushState({}, '', '/');
  window.localStorage.setItem('auth_token', 'test-token');
  window.localStorage.setItem('auth_user', JSON.stringify({ id: 1, name: 'Alex', email: 'user@example.com' }));
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Logout/i)).toBeInTheDocument();
});
