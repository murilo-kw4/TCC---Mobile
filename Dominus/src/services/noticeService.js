import { api } from './api';

export async function listNotices() {
  const { data } = await api.get('/notices');
  return Array.isArray(data) ? data : [];
}
