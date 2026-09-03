import { useCallback, useState } from 'react';
import { getCalendar } from '../services/calendarService';

export function useCalendar(year, month) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCalendar(year, month);
      setItems(Array.isArray(data?.items) ? data.items : []);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [year, month]);

  return {
    items,
    loading,
    error,
    reload,
  };
}
