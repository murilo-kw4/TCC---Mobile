import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules, Platform } from 'react-native';

export const STORAGE_KEYS = {
  accessToken: '@dominus:accessToken',
  refreshToken: '@dominus:refreshToken',
  user: '@dominus:user',
};

function normalizeUrl(url) {
  return url ? url.replace(/\/+$/, '') : null;
}

function getMetroHost() {
  const scriptURL = NativeModules?.SourceCode?.scriptURL;
  if (!scriptURL) return null;

  const match = scriptURL.match(/^https?:\/\/([^/:]+)/i);
  return match ? match[1] : null;
}

function resolveApiUrl() {
  const configured = normalizeUrl(process.env.EXPO_PUBLIC_API_URL);
  if (configured) return configured;

  // Em desenvolvimento com Expo Go, o bundle normalmente vem do mesmo
  // computador que está executando o backend. Aproveitamos esse IP.
  const metroHost = getMetroHost();
  if (metroHost && metroHost !== 'localhost' && metroHost !== '127.0.0.1') {
    return `http://${metroHost}:3000`;
  }

  // Fallbacks para simuladores/emuladores locais.
  if (Platform.OS === 'android') return 'http://10.0.2.2:3000';
  return 'http://localhost:3000';
}

export const API_URL = resolveApiUrl();

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function saveSession(user, tokens) {
  await AsyncStorage.multiSet([
    [STORAGE_KEYS.accessToken, tokens.accessToken],
    [STORAGE_KEYS.refreshToken, tokens.refreshToken],
    [STORAGE_KEYS.user, JSON.stringify(user)],
  ]);
}

export async function saveUser(user) {
  await AsyncStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
}

export async function getStoredUser() {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.user);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function clearSession() {
  await AsyncStorage.multiRemove([
    STORAGE_KEYS.accessToken,
    STORAGE_KEYS.refreshToken,
    STORAGE_KEYS.user,
  ]);
}

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(STORAGE_KEYS.accessToken);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const url = originalRequest?.url || '';

    const isAuthRoute =
      url.includes('/auth/login') ||
      url.includes('/auth/register') ||
      url.includes('/auth/refresh');

    if (status !== 401 || !originalRequest || originalRequest._retry || isAuthRoute) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.refreshToken);
      if (!refreshToken) throw error;

      if (!refreshPromise) {
        refreshPromise = axios
          .post(
            `${API_URL}/auth/refresh`,
            { refreshToken },
            { timeout: 10000 }
          )
          .then(async ({ data }) => {
            const storedUser = await getStoredUser();
            if (!storedUser) throw new Error('Sessão local inválida');

            await saveSession(storedUser, data.tokens);
            return data.tokens.accessToken;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const accessToken = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      await clearSession();
      return Promise.reject(refreshError);
    }
  }
);
