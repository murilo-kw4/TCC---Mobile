import { useCallback, useEffect, useState } from 'react';
import {
  createScheduled,
  listMyScheduled,
  listSchedulableEvents,
} from '../services/scheduledService';

export function useScheduled() {
  const [events, setEvents] = useState([]);
  const [scheduled, setScheduled] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [eventsData, scheduledData] = await Promise.all([
        listSchedulableEvents(),
        listMyScheduled(),
      ]);

      setEvents(eventsData);
      setScheduled(scheduledData);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload().catch(() => {});
  }, [reload]);

  const schedule = useCallback(async (payload) => {
    setSaving(true);
    setError(null);

    try {
      const created = await createScheduled(payload);
      setScheduled((current) => [created, ...current]);
      return created;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  return {
    events,
    scheduled,
    loading,
    saving,
    error,
    reload,
    schedule,
  };
}
