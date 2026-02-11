import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getProducts()
      .then((data) => {
        if (mounted) setItems(data.items || []);
      })
      .catch(() => {
        if (mounted) setItems([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="products-grid">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
