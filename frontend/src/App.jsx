import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from './components/UserLayout.jsx';
import AdminLayout from './components/AdminLayout.jsx';

// User pages
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';

// Admin pages
import AdminLogin from './pages/AdminLogin.jsx';
import AdminSignup from './pages/AdminSignup.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminProducts from './pages/AdminProducts.jsx';
import AdminContacts from './pages/AdminContacts.jsx';

export default function App() {
  return (
    <Routes>
      {/* Admin routes - separate layout */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
      <Route path="/admin/contacts" element={<AdminLayout><AdminContacts /></AdminLayout>} />
      
      {/* User routes - main layout */}
      <Route path="/" element={<UserLayout><Home /></UserLayout>} />
      <Route path="/about" element={<UserLayout><About /></UserLayout>} />
      <Route path="/products" element={<UserLayout><Products /></UserLayout>} />
      <Route path="/products/:id" element={<UserLayout><ProductDetail /></UserLayout>} />
      <Route path="/cart" element={<UserLayout><Cart /></UserLayout>} />
      <Route path="/checkout" element={<UserLayout><Checkout /></UserLayout>} />
      <Route path="/login" element={<UserLayout><Login /></UserLayout>} />
      <Route path="/signup" element={<UserLayout><Signup /></UserLayout>} />
      <Route path="/contact" element={<UserLayout><Contact /></UserLayout>} />
    </Routes>
  );
}
