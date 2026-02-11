import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart_items') || '[]');
    setItems(data);
  }, []);

  const updateQty = (id, qty) => {
    const next = items.map((i) => (i.id === id ? { ...i, qty } : i));
    setItems(next);
    localStorage.setItem('cart_items', JSON.stringify(next));
  };

  const removeItem = (id) => {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    localStorage.setItem('cart_items', JSON.stringify(next));
  };

  const subtotal = items.reduce((s, i) => s + Number(i.price) * Number(i.qty), 0);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. <Link to="/products" className="text-indigo-600">Browse products</Link></p>
      ) : (
        <>
          <ul className="space-y-3" data-testid="cart-list">
            {items.map((item) => (
              <li key={item.id} className="border rounded p-3 bg-white flex items-center justify-between">
                <div>
                  <div className="font-semibold">{item.modelName}</div>
                  <div className="text-sm text-gray-600">${Number(item.price).toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm" htmlFor={`qty-${item.id}`}>Qty</label>
                  <input
                    id={`qty-${item.id}`}
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateQty(item.id, Number(e.target.value))}
                    className="w-16 border rounded p-1"
                  />
                  <button className="px-3 py-1 border rounded" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-lg font-semibold">Subtotal: ${subtotal.toFixed(2)}</div>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded"
              onClick={() => navigate('/checkout')}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}
