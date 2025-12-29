import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: true,
});

// Intercepteur pour ajouter automatiquement le token JWT à chaque requête
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;
