import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminNavbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('auth_user') || '{}');

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    navigate('/admin/login');
  };

  return (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold">🔧 Admin Panel</div>
          <nav className="hidden md:flex space-x-6" aria-label="Admin Navigation">
            <Link to="/admin" className="hover:text-red-200 transition-colors">Dashboard</Link>
            <Link to="/admin/products" className="hover:text-red-200 transition-colors">Products</Link>
            <Link to="/admin/contacts" className="hover:text-red-200 transition-colors">Contacts</Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-red-200">
            Welcome, {user.name || 'Admin'}
          </span>
          <div className="flex space-x-2">
            <Link 
              to="/" 
              className="px-3 py-1 border border-red-300 rounded hover:bg-red-700 transition-colors text-sm"
            >
              View Site
            </Link>
            <button 
              onClick={logout}
              className="px-3 py-1 bg-red-700 rounded hover:bg-red-800 transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}