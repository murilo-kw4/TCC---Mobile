import { api } from './api';

export async function getCalendar(year, month) {
  const { data } = await api.get('/calendar', {
    params: { year, month },
  });

  return data;
}
