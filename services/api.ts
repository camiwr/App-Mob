// Ficheiro: services/api.ts

import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  console.error("ERRO CRÍTICO: A variável de ambiente EXPO_PUBLIC_API_URL não foi definida.");
}

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    try {
      // O NOME CORRETO DA FUNÇÃO É getItemAsync.
      const token = await SecureStore.getItemAsync('user_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erro ao obter o token do SecureStore:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;