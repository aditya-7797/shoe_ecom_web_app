import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const user = JSON.parse(localStorage.getItem('auth_user') || '{}');
    // Only show as authenticated if user is not admin
    setAuthed(!!token && user.role !== 'admin');
    const handler = () => {
      const token = localStorage.getItem('auth_token');
      const user = JSON.parse(localStorage.getItem('auth_user') || '{}');
      setAuthed(!!token && user.role !== 'admin');
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setAuthed(false);
  };
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-indigo-600">👟 Shoes E‑Commerce</div>
        <nav className="hidden md:flex gap-6" aria-label="Primary">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-indigo-600 transition-colors">About Us</Link>
          <Link to="/products" className="hover:text-indigo-600 transition-colors">Products</Link>
          <Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact Us</Link>
        </nav>
        <div className="flex gap-3">
          {!authed ? (
            <>
              <Link to="/login" className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors">Login</Link>
              <Link to="/signup" className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">Sign Up</Link>
              <Link to="/admin/login" className="px-3 py-1 border border-red-600 text-red-600 rounded hover:bg-red-50 transition-colors text-sm">Admin</Link>
            </>
          ) : (
            <>
              <Link to="/cart" className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors">Cart</Link>
              <button onClick={logout} className="px-3 py-1 border rounded hover:bg-gray-100 transition-colors">Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
