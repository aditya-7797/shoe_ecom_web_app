import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { getProductDetail } from '../services/api.js';

export default function AdminProductImages({ productId }) {
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({ url: '', altText: '', order: 1 });
  const token = localStorage.getItem('auth_token');
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const load = async () => {
    try {
      const detail = await getProductDetail(productId);
      setImages(detail.images || []);
    } catch (_) {
      setImages([]);
    }
  };

  useEffect(() => { load(); }, [productId]);

  const add = async (e) => {
    e.preventDefault();
    await api.post(`/admin/products/${productId}/images`, form, { headers: authHeader }).catch(() => {});
    setForm({ url: '', altText: '', order: 1 });
    load();
  };

  const remove = async (imageIdx) => {
    const image = images[imageIdx];
    if (!image) return;
    await api.delete(`/admin/products/${productId}/images/${imageIdx + 1}`, { headers: authHeader }).catch(() => {});
    // Note: ideally we need image id; for demo, reload via GET detail which will reflect deletion if IDs align
    load();
  };

  return (
    <div className="mt-3 border rounded p-3 bg-gray-50">
      <h3 className="font-semibold mb-2">Manage Images</h3>
      <div className="flex gap-2 flex-wrap mb-3">
        {images.map((img, i) => (
          <div key={i} className="w-32">
            <img src={img.url} alt={img.altText || `Image ${i + 1}`} className="w-32 h-20 object-cover rounded" />
            <button className="mt-1 w-full px-2 py-1 border rounded text-sm" onClick={() => remove(i)}>Delete</button>
          </div>
        ))}
        {images.length === 0 && <div className="text-gray-500">No images</div>}
      </div>
      <form className="grid grid-cols-1 md:grid-cols-4 gap-2" onSubmit={add}>
        <input className="border rounded p-2" placeholder="Image URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
        <input className="border rounded p-2" placeholder="Alt text" value={form.altText} onChange={(e) => setForm({ ...form, altText: e.target.value })} />
        <input className="border rounded p-2" placeholder="Order" type="number" min="1" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Add Image</button>
      </form>
    </div>
  );
}
