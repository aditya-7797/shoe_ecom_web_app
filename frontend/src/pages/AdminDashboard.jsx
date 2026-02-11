import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <Link to="/admin/products" className="border rounded p-4 bg-white hover:bg-gray-50">Manage Products</Link>
        <Link to="/admin/contacts" className="border rounded p-4 bg-white hover:bg-gray-50">View Contact Requests</Link>
      </div>
    </section>
  );
}
