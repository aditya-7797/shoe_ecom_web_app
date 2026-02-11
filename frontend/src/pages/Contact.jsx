import React, { useState } from 'react';
import { api } from '../services/api.js';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.post('/contact', form);
      setForm({ name: '', email: '', message: '' });
      setStatus('sent');
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">Contact Us</h1>
      <form className="space-y-3 max-w-md" onSubmit={handleSubmit}>
        <input 
          className="border rounded w-full p-2" 
          placeholder="Name" 
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
          required
        />
        <input 
          className="border rounded w-full p-2" 
          placeholder="Email" 
          type="email"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
          required
        />
        <textarea 
          className="border rounded w-full p-2" 
          placeholder="Message" 
          rows={4}
          value={form.message}
          onChange={(e) => setForm({...form, message: e.target.value})}
          required
        />
        <button 
          className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-400" 
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending...' : 'Send'}
        </button>
        {status === 'sent' && <p className="text-green-600">Message sent successfully!</p>}
        {status === 'error' && <p className="text-red-600">Failed to send message. Please try again.</p>}
      </form>
    </section>
  );
}
