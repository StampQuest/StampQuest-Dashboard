import axios from 'axios';
import CryptoJS from 'crypto-js';

const k = CryptoJS.SHA256(`auth ${Math.PI.toString(16)}`).toString(CryptoJS.enc.Base64);

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getToken = () => {
  const store = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('USER'), k).toString(CryptoJS.enc.Utf8));
  if (store?.state?.user?.token) return store.state.user.token;
  return null;
};
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
