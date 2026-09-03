import { api } from './api';

export async function listSchedulableEvents() {
  const { data } = await api.get('/events/schedulable/me');
  return data;
}

export async function listMyScheduled() {
  const { data } = await api.get('/scheduled/me');
  return data;
}

export async function createScheduled({
  eventId,
  inicialDate,
  finalDate,
  visibility = 'privado',
  userNotes = '',
}) {
  const { data } = await api.post('/scheduled', {
    event_id: eventId,
    inicial_date: inicialDate,
    final_date: finalDate,
    visibility,
    user_notes: userNotes || null,
  });

  return data;
}
