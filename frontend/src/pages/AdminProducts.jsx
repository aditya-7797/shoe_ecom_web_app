import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import AdminProductImages from '../components/AdminProductImages.jsx';

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ 
    modelName: '', 
    description: '', 
    price: '',
    mainImage: '',
    image2: '',
    image3: '',
    image4: ''
  });
  const [expandedId, setExpandedId] = useState(null);

  const token = localStorage.getItem('auth_token');
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const load = async () => {
    try {
      const res = await api.get('/admin/products', { headers: authHeader });
      setItems(res.data.items || []);
    } catch (_) {
      setItems([]);
    }
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      // Create the product first
      const productRes = await api.post('/admin/products', {
        modelName: form.modelName,
        description: form.description,
        price: form.price
      }, { headers: authHeader });
      
      const productId = productRes.data.id;
      
      // Add images if provided
      const images = [
        { url: form.mainImage, altText: `${form.modelName} main image`, order: 1 },
        { url: form.image2, altText: `${form.modelName} image 2`, order: 2 },
        { url: form.image3, altText: `${form.modelName} image 3`, order: 3 },
        { url: form.image4, altText: `${form.modelName} image 4`, order: 4 }
      ];
      
      // Only add images that have URLs
      for (const image of images) {
        if (image.url && image.url.trim()) {
          await api.post(`/admin/products/${productId}/images`, image, { headers: authHeader });
        }
      }
      
      setForm({ 
        modelName: '', 
        description: '', 
        price: '',
        mainImage: '',
        image2: '',
        image3: '',
        image4: ''
      });
      load();
    } catch (err) {
      console.error('Failed to create product:', err);
      alert('Failed to create product. Please try again.');
    }
  };

  const remove = async (id) => {
    await api.delete(`/admin/products/${id}`, { headers: authHeader }).catch(() => {});
    load();
  };

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <form className="space-y-4 mb-6" onSubmit={create}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input 
              className="border rounded p-2 w-full" 
              placeholder="Model Name" 
              value={form.modelName} 
              onChange={(e) => setForm({ ...form, modelName: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
            <input 
              className="border rounded p-2 w-full" 
              placeholder="Price (e.g., 99.99)" 
              type="number"
              step="0.01"
              value={form.price} 
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            className="border rounded p-2 w-full" 
            placeholder="Product description" 
            rows="3"
            value={form.description} 
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Product Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Main Image URL *</label>
              <input 
                className="border rounded p-2 w-full" 
                placeholder="https://example.com/main-image.jpg" 
                type="url"
                value={form.mainImage} 
                onChange={(e) => setForm({ ...form, mainImage: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Image 2</label>
              <input 
                className="border rounded p-2 w-full" 
                placeholder="https://example.com/image-2.jpg" 
                type="url"
                value={form.image2} 
                onChange={(e) => setForm({ ...form, image2: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Image 3</label>
              <input 
                className="border rounded p-2 w-full" 
                placeholder="https://example.com/image-3.jpg" 
                type="url"
                value={form.image3} 
                onChange={(e) => setForm({ ...form, image3: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Image 4</label>
              <input 
                className="border rounded p-2 w-full" 
                placeholder="https://example.com/image-4.jpg" 
                type="url"
                value={form.image4} 
                onChange={(e) => setForm({ ...form, image4: e.target.value })}
              />
            </div>
          </div>
          <div className="text-sm text-gray-600">
            💡 <strong>Tip:</strong> Use free image hosting like <a href="https://unsplash.com" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Unsplash</a> or <a href="https://imgur.com" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Imgur</a> for shoe images.
          </div>
        </div>
        
        <button className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors font-medium">
          Add Product with Images
        </button>
      </form>
      <ul className="space-y-2" data-testid="admin-products-list">
        {items.map((p) => (
          <li key={p.id} className="flex justify-between border rounded p-3 bg-white">
            <div>
              <div className="font-semibold">{p.modelName}</div>
              <div className="text-sm text-gray-600">${Number(p.price).toFixed(2)}</div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded" onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}>
                {expandedId === p.id ? 'Hide Images' : 'Manage Images'}
              </button>
              <button className="px-3 py-1 border rounded" onClick={() => remove(p.id)}>Delete</button>
            </div>
            {expandedId === p.id && (
              <div className="mt-3 w-full">
                <AdminProductImages productId={p.id} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
