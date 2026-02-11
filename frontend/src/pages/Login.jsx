import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { addToCart, buyNow } from '../services/cart.js';
import { getProductDetail } from '../services/api.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, user } = res.data;
      
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      // Handle pending cart action after login
      await handlePostLoginCartAction();
      
      // Redirect to intended page or home
      const redirectTo = localStorage.getItem('redirect_after_login') || '/';
      localStorage.removeItem('redirect_after_login');
      window.location.href = redirectTo; // Use location to trigger navbar update
      
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePostLoginCartAction = async () => {
    const pendingAction = localStorage.getItem('pending_cart_action');
    if (!pendingAction) return;
    
    try {
      const action = JSON.parse(pendingAction);
      const product = await getProductDetail(action.productId);
      
      if (action.type === 'add') {
        addToCart(product);
        // Show success notification
        setTimeout(() => alert('Product added to cart!'), 500);
      } else if (action.type === 'buy') {
        buyNow(product);
      }
      
      localStorage.removeItem('pending_cart_action');
    } catch (err) {
      console.error('Failed to complete cart action:', err);
      localStorage.removeItem('pending_cart_action');
    }
  };

  return (
    <section className="max-w-md">
      <h1 className="text-2xl font-bold mb-3">Login</h1>
      {localStorage.getItem('pending_cart_action') && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          Please login to add items to your cart.
        </div>
      )}
      <form className="space-y-3" onSubmit={submit}>
        <input 
          className="border rounded w-full p-2" 
          placeholder="Email" 
          type="email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          className="border rounded w-full p-2" 
          placeholder="Password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button 
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400 w-full" 
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link to="/signup" className="text-indigo-600 hover:text-indigo-800">Don't have an account? Sign up</Link>
      </div>
    </section>
  );
}
