import React from 'react';

function AuthPrompt() {
  return (
    <div className="text-sm text-blue-600 mt-2 flex items-center gap-1">
      <span>🔒</span>
      <span>Login required to add items to cart</span>
    </div>
  );
}

export default function ProductDetailActions({ product, onAddToCart, onBuyNow }) {
  const isAuthenticated = () => {
    const token = localStorage.getItem('auth_token');
    const user = JSON.parse(localStorage.getItem('auth_user') || '{}');
    return !!token && user.role !== 'admin';
  };

  return (
    <div className="mt-4">
      <div className="flex gap-3">
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          aria-label="Add to Cart"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
        <button
          className="px-4 py-2 border rounded hover:bg-gray-100 transition-colors"
          aria-label="Buy Now"
          onClick={() => onBuyNow(product)}
        >
          Buy Now
        </button>
      </div>
      {!isAuthenticated() && <AuthPrompt />}
    </div>
  );
}
