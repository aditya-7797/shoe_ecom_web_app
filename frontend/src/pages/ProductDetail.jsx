import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetail, getReviews } from '../services/api.js';
import ImageGallery from '../components/ImageGallery.jsx';
import ProductDetailActions from '../components/ProductDetailActions.jsx';
import { addToCart, buyNow } from '../services/cart.js';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      getProductDetail(id),
      getReviews(id),
    ])
      .then(([p, r]) => {
        if (mounted) {
          setProduct(p);
          setReviews(r.items || []);
        }
      })
      .catch(() => {
        if (mounted) {
          setProduct(null);
          setReviews([]);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, [id]);

  const checkAuth = () => {
    const token = localStorage.getItem('auth_token');
    const user = JSON.parse(localStorage.getItem('auth_user') || '{}');
    return !!token && user.role !== 'admin'; // Only regular users can shop
  };

  const handleAddToCart = () => {
    if (!checkAuth()) {
      // Store the intended action for after login
      localStorage.setItem('redirect_after_login', `/products/${id}`);
      localStorage.setItem('pending_cart_action', JSON.stringify({ type: 'add', productId: id }));
      navigate('/login');
      return;
    }
    
    if (product) {
      addToCart(product);
      // Show success message or update UI
      alert('Product added to cart!');
    }
  };

  const handleBuyNow = () => {
    if (!checkAuth()) {
      localStorage.setItem('redirect_after_login', `/products/${id}`);
      localStorage.setItem('pending_cart_action', JSON.stringify({ type: 'buy', productId: id }));
      navigate('/login');
      return;
    }
    
    if (product) {
      buyNow(product);
      navigate('/cart');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <section className="grid md:grid-cols-2 gap-8">
      <div>
        <ImageGallery images={product.images || []} />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{product.modelName}</h1>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <div className="mt-3 flex items-center gap-4">
          <span className="text-xl font-extrabold">${Number(product.price).toFixed(2)}</span>
          <span className="text-sm" aria-label={`Rating ${product.rating}`}>⭐ {product.rating}</span>
        </div>
        <ProductDetailActions product={product} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Reviews</h2>
          <ul className="mt-2 space-y-3">
            {reviews.length === 0 && <li className="text-gray-500">No reviews yet</li>}
            {reviews.map((rev) => (
              <li key={rev.id} className="border rounded p-3 bg-white">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{rev.title || 'Review'}</span>
                  <span className="text-sm">⭐ {rev.rating}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{rev.body}</p>
                <p className="text-xs text-gray-500 mt-1">by {rev.author || 'Anonymous'}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
