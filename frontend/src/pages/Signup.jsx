import React, { useState } from 'react';
import { api } from '../services/api.js';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/signup', { name, email, password });
      localStorage.setItem('auth_token', res.data.token);
      localStorage.setItem('auth_user', JSON.stringify(res.data.user));
      window.location.href = '/';
    } catch (err) {
      setError('Signup failed');
    }
  };

  return (
    <section className="max-w-md">
      <h1 className="text-2xl font-bold mb-3">Sign Up</h1>
      <form className="space-y-3" onSubmit={submit}>
        <input className="border rounded w-full p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border rounded w-full p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border rounded w-full p-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Create Account</button>
      </form>
    </section>
  );
}
