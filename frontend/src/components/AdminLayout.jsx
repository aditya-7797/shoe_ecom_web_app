import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar.jsx';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const user = JSON.parse(localStorage.getItem('auth_user') || '{}');
    
    if (!token || user.role !== 'admin') {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}