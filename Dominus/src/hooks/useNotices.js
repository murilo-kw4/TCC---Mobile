import { useCallback, useEffect, useState } from 'react';
import { listNotices } from '../services/noticeService';

export default function useNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async ({ refresh = false } = {}) => {
    try {
      setError(null);

      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const rows = await listNotices();
      setNotices(rows);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const reload = useCallback(() => {
    return load({ refresh: false });
  }, [load]);

  const refresh = useCallback(() => {
    return load({ refresh: true });
  }, [load]);

  useEffect(() => {
    reload();
  }, [reload]);

  return {
    notices,
    loading,
    refreshing,
    error,
    reload,
    refresh,
  };
}
