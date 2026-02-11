import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export const api = axios.create({ baseURL });

export async function getHealth() {
  const res = await api.get('/health');
  return res.data;
}

export async function getProducts() {
  const res = await api.get('/products');
  return res.data;
}

export async function getProductDetail(id) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}

export async function getReviews(productId) {
  const res = await api.get(`/reviews`, { params: { productId } });
  return res.data;
}
