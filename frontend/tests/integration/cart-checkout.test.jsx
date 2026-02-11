import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Cart from '../../src/pages/Cart.jsx';
import Checkout from '../../src/pages/Checkout.jsx';

/**
 * US4: Integration test for cart updates and checkout confirmation
 */

test('cart updates quantities and confirms checkout', async () => {
  // Seed localStorage cart
  const seed = [
    { id: 1, modelName: 'Nova Runner', price: 99.99, qty: 1 },
    { id: 2, modelName: 'Aero Glide', price: 89.99, qty: 2 },
  ];
  window.localStorage.setItem('cart_items', JSON.stringify(seed));

  // Render Cart
  const ui = (
    <MemoryRouter initialEntries={["/cart"]}>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </MemoryRouter>
  );
  render(ui);

  const list = await screen.findByTestId('cart-list');
  expect(list.querySelectorAll('li').length).toBe(2);

  // Update quantity of first item to 3
  const qtyInputs = screen.getAllByLabelText('Qty');
  const qtyInput = qtyInputs[0];
  fireEvent.change(qtyInput, { target: { value: '3' } });

  // Click Checkout
  fireEvent.click(screen.getByRole('button', { name: /Checkout/i }));

  // Confirm order
  const confirmBtn = await screen.findByRole('button', { name: /Confirm Order/i });
  fireEvent.click(confirmBtn);

  // Order confirmed message
  expect(await screen.findByRole('heading', { name: /Order Confirmed/i })).toBeInTheDocument();
});
