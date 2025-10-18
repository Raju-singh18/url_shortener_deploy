
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'https://shortly-x2lu.onrender.com/api/url',
  withCredentials:true,
});

export const createShort = async (payload) => {
  const res = await API.post('/create', payload);
  return res.data; // { shortUrl, data }
};

export const listUrls = async () => {
  const res = await API.get('/list');
  return res.data; // { urls: [...] }
};
