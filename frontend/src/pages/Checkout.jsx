import React, { useEffect, useState } from 'react';

export default function Checkout() {
  const [items, setItems] = useState([]);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart_items') || '[]');
    setItems(data);
  }, []);

  const subtotal = items.reduce((s, i) => s + Number(i.price) * Number(i.qty), 0);

  const confirm = () => {
    localStorage.setItem('cart_items', JSON.stringify([]));
    setConfirmed(true);
  };

  if (confirmed) {
    return <section><h1 className="text-2xl font-bold mb-3">Order Confirmed</h1><p className="text-gray-600">Thank you! Your order has been placed.</p></section>;
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-3">Checkout</h1>
      {items.length === 0 ? (
        <p className="text-gray-600">No items to checkout.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between">
                <span>{i.modelName} x {i.qty}</span>
                <span>${(Number(i.price) * Number(i.qty)).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 font-semibold">Total: ${subtotal.toFixed(2)}</div>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded" onClick={confirm}>Confirm Order</button>
        </>
      )}
    </section>
  );
}
