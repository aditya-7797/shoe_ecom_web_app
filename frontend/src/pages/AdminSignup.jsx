import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api.js';

export default function AdminSignup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Create user with admin role
      const userData = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: 'admin'
      };
      
      const res = await api.post('/auth/admin-signup', userData);
      const { token, user } = res.data;
      
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-red-600">Admin Signup</h1>
            <p className="text-gray-600 mt-2">Create admin account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="admin@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Create password"
                minLength="6"
                required
              />
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 disabled:bg-gray-400 font-medium"
            >
              {loading ? 'Creating Account...' : 'Create Admin Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/admin/login" className="text-red-600 hover:text-red-800">Already have admin account? Sign in</Link>
            <div className="mt-2">
              <Link to="/" className="text-gray-600 hover:text-gray-800">← Back to main site</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}