import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  api,
  clearSession,
  getStoredUser,
  saveSession,
  saveUser,
  STORAGE_KEYS,
} from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    const { data } = await api.get('/users/me');
    await saveUser(data);
    setUser(data);
    return data;
  }, []);

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      try {
        const [storedUser, accessToken] = await Promise.all([
          getStoredUser(),
          AsyncStorage.getItem(STORAGE_KEYS.accessToken),
        ]);

        if (!accessToken) {
          await clearSession();
          return;
        }

        if (storedUser && active) setUser(storedUser);

        const { data } = await api.get('/users/me');
        await saveUser(data);
        if (active) setUser(data);
      } catch {
        await clearSession();
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    bootstrap();

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', {
      email: email.trim().toLowerCase(),
      password,
    });

    if (data.user.role !== 'fiel') {
      // O app mobile é destinado ao perfil fiel. O admin será tratado no web.
      try {
        await api.post('/auth/logout', { refreshToken: data.tokens.refreshToken });
      } catch {
        // O descarte local da sessão é suficiente mesmo se o logout remoto falhar.
      }
      throw new Error('ADMIN_NOT_ALLOWED');
    }

    await saveSession(data.user, data.tokens);
    setUser(data.user);
    return data.user;
  }, []);

  const register = useCallback(async ({ name, email, password }) => {
    const { data } = await api.post('/auth/register', {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    await saveSession(data.user, data.tokens);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.refreshToken);

    try {
      if (refreshToken) {
        await api.post('/auth/logout', { refreshToken });
      }
    } finally {
      await clearSession();
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      refreshProfile,
    }),
    [user, loading, login, register, logout, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }

  return context;
}
