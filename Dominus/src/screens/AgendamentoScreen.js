import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Header from '../components/Header';
import { useScheduled } from '../hooks/useScheduled';

function formatDateTime(value) {
  try {
    return new Date(value).toLocaleString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  } catch {
    return value;
  }
}

function statusLabel(status) {
  if (status === 'ACEITO') return 'Aceito';
  if (status === 'RECUSADO') return 'Recusado';
  return 'Pendente';
}

export default function AgendamentoScreen() {
  const {
    events,
    scheduled,
    loading,
    saving,
    reload,
    schedule,
  } = useScheduled();

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [startDate, setStartDate] = useState(() => new Date());
  const [endDate, setEndDate] = useState(() => new Date(Date.now() + 60 * 60 * 1000));
  const [notes, setNotes] = useState('');
  const [picker, setPicker] = useState(null);

  const selectedEvent = useMemo(
    () => events.find((item) => item.id === selectedEventId) || null,
    [events, selectedEventId]
  );

  function onPickerChange(event, value) {
    if (event.type === 'dismissed' || !value) {
      setPicker(null);
      return;
    }

    if (picker === 'startDate') {
      const next = new Date(startDate);
      next.setFullYear(value.getFullYear(), value.getMonth(), value.getDate());
      setStartDate(next);
    } else if (picker === 'startTime') {
      const next = new Date(startDate);
      next.setHours(value.getHours(), value.getMinutes(), 0, 0);
      setStartDate(next);
    } else if (picker === 'endDate') {
      const next = new Date(endDate);
      next.setFullYear(value.getFullYear(), value.getMonth(), value.getDate());
      setEndDate(next);
    } else if (picker === 'endTime') {
      const next = new Date(endDate);
      next.setHours(value.getHours(), value.getMinutes(), 0, 0);
      setEndDate(next);
    }

    setPicker(null);
  }

  async function handleSchedule() {
    if (!selectedEventId) {
      Alert.alert('Agendamento', 'Selecione o tipo de evento.');
      return;
    }

    if (endDate <= startDate) {
      Alert.alert('Agendamento', 'O término precisa ser posterior ao início.');
      return;
    }

    try {
      await schedule({
        eventId: selectedEventId,
        inicialDate: startDate.toISOString(),
        finalDate: endDate.toISOString(),
        visibility: 'privado',
        userNotes: notes.trim(),
      });

      setNotes('');
      Alert.alert(
        'Solicitação enviada',
        'Seu agendamento foi registrado com status PENDENTE.'
      );
    } catch (error) {
      const apiError = error.response?.data?.error;
      let message = 'Não foi possível criar o agendamento.';

      if (apiError === 'forbidden') {
        message = 'Este evento não pode ser solicitado pelo perfil fiel.';
      } else if (apiError === 'event not found') {
        message = 'O evento selecionado não existe mais.';
      } else if (apiError === 'invalid date') {
        message = 'Confira as datas e horários informados.';
      }

      Alert.alert('Erro', message);
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Agendamento" />
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.helper}>Carregando dados...</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header title="Agendamento" />

      <Text style={styles.separator}>❦</Text>

      <View style={styles.form}>
        <Text style={styles.temporary}>
          Tela funcional temporária. O design poderá ser substituído sem alterar a integração.
        </Text>

        <Text style={styles.label}>Tipo de agendamento</Text>

        {events.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.helper}>
              Nenhum evento está liberado para solicitação pelo fiel.
            </Text>
            <TouchableOpacity style={styles.secondaryButton} onPress={reload}>
              <Text style={styles.secondaryButtonText}>Atualizar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.eventList}>
            {events.map((event) => {
              const selected = event.id === selectedEventId;
              return (
                <TouchableOpacity
                  key={event.id}
                  style={[styles.eventButton, selected && styles.eventButtonSelected]}
                  onPress={() => setSelectedEventId(event.id)}
                >
                  <Text
                    style={[
                      styles.eventButtonText,
                      selected && styles.eventButtonTextSelected,
                    ]}
                  >
                    {event.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {selectedEvent?.description ? (
          <Text style={styles.description}>{selectedEvent.description}</Text>
        ) : null}

        <Text style={styles.label}>Início</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setPicker('startDate')}
          >
            <Text>{startDate.toLocaleDateString('pt-BR')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setPicker('startTime')}
          >
            <Text>
              {startDate.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Término</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setPicker('endDate')}
          >
            <Text>{endDate.toLocaleDateString('pt-BR')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setPicker('endTime')}
          >
            <Text>
              {endDate.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Observações (opcional)</Text>
        <TextInput
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
          style={styles.textArea}
          placeholder="Informações adicionais para a secretaria paroquial"
        />

        <TouchableOpacity
          style={[styles.button, saving && styles.buttonDisabled]}
          onPress={handleSchedule}
          disabled={saving || events.length === 0}
        >
          {saving ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.buttonText}>Solicitar agendamento</Text>
          )}
        </TouchableOpacity>

        <View style={styles.historyHeader}>
          <Text style={styles.sectionTitle}>Meus agendamentos</Text>
          <TouchableOpacity onPress={reload}>
            <Text style={styles.refreshText}>Atualizar</Text>
          </TouchableOpacity>
        </View>

        {scheduled.length === 0 ? (
          <Text style={styles.helper}>Você ainda não possui agendamentos.</Text>
        ) : (
          scheduled.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.cardTitle}>
                {item.event_title || `Evento #${item.event_id}`}
              </Text>
              <Text style={styles.cardText}>
                {formatDateTime(item.inicial_date)} até {formatDateTime(item.final_date)}
              </Text>
              <Text style={styles.cardStatus}>Status: {statusLabel(item.status)}</Text>
              {item.admin_notes ? (
                <Text style={styles.cardText}>Secretaria: {item.admin_notes}</Text>
              ) : null}
            </View>
          ))
        )}
      </View>

      {picker ? (
        <DateTimePicker
          value={picker.startsWith('start') ? startDate : endDate}
          mode={picker.endsWith('Time') ? 'time' : 'date'}
          onChange={onPickerChange}
        />
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0EA',
  },
  center: {
    padding: 40,
    alignItems: 'center',
  },
  separator: {
    textAlign: 'center',
    color: '#C8A96B',
    fontSize: 22,
    marginVertical: 10,
  },
  form: {
    padding: 15,
    paddingBottom: 40,
  },
  temporary: {
    marginBottom: 10,
    color: '#7A5B4B',
    fontSize: 12,
  },
  label: {
    color: '#6B2226',
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 12,
  },
  eventList: {
    gap: 8,
  },
  eventButton: {
    borderWidth: 1,
    borderColor: '#D5C8BD',
    backgroundColor: '#FFF',
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  eventButtonSelected: {
    borderColor: '#6B2226',
  },
  eventButtonText: {
    color: '#5A4A42',
  },
  eventButtonTextSelected: {
    color: '#6B2226',
    fontWeight: 'bold',
  },
  description: {
    color: '#6F625B',
    marginTop: 8,
    lineHeight: 19,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  dateButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D5C8BD',
    backgroundColor: '#FFF',
    padding: 12,
    alignItems: 'center',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#D5C8BD',
    backgroundColor: '#FFF',
    minHeight: 90,
    padding: 10,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#284D99',
    marginTop: 22,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  secondaryButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#7A5B4B',
  },
  secondaryButtonText: {
    color: '#7A5B4B',
    fontWeight: 'bold',
  },
  emptyBox: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D5C8BD',
    padding: 12,
  },
  historyHeader: {
    marginTop: 28,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#6B2226',
    fontSize: 18,
    fontWeight: 'bold',
  },
  refreshText: {
    color: '#284D99',
    fontWeight: 'bold',
  },
  helper: {
    color: '#6F625B',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D5C8BD',
    padding: 12,
    marginBottom: 10,
  },
  cardTitle: {
    color: '#6B2226',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    color: '#5A4A42',
    marginTop: 3,
  },
  cardStatus: {
    color: '#284D99',
    fontWeight: 'bold',
    marginTop: 6,
  },
});
