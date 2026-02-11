import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export default function AdminContacts() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem('auth_token');
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    api.get('/admin/contacts', { headers: authHeader })
      .then((res) => setItems(res.data.items || []))
      .catch(() => setItems([]));
  }, []);

  const markReviewed = async (id) => {
    await api.put(`/admin/contacts/${id}`, { status: 'reviewed' }, { headers: authHeader }).catch(() => {});
    const next = items.map((c) => (c.id === id ? { ...c, status: 'reviewed' } : c));
    setItems(next);
  };

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Contact Requests</h1>
      <ul className="space-y-2" data-testid="admin-contacts-list">
        {items.length === 0 && <li className="text-gray-600">No contact requests</li>}
        {items.map((c) => (
          <li key={c.id} className="flex justify-between border rounded p-3 bg-white">
            <div>
              <div className="font-semibold">{c.name} ({c.email})</div>
              <div className="text-sm text-gray-600">{c.message}</div>
            </div>
            <button className="px-3 py-1 border rounded" onClick={() => markReviewed(c.id)} disabled={c.status === 'reviewed'}>
              {c.status === 'reviewed' ? 'Reviewed' : 'Mark Reviewed'}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
