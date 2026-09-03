import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import Header from '../components/Header';
import { useCalendar } from '../hooks/useCalendar';

const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function normalizeCategory(value) {
  return String(value || '').trim().toUpperCase();
}

function matchesFilter(item, filter) {
  if (filter === 'TODOS') return true;
  const category = normalizeCategory(item.event_category);

  if (filter === 'EVENTO') {
    return category === 'EVENTO COMUM' || category === 'EVENTO';
  }

  return category === filter;
}

function overlapsDay(item, year, monthIndex, day) {
  if (!item?.inicial_date || !item?.final_date) return false;

  const start = new Date(item.inicial_date);
  const end = new Date(item.final_date);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return false;

  const dayStart = new Date(year, monthIndex, day, 0, 0, 0, 0);
  const nextDay = new Date(year, monthIndex, day + 1, 0, 0, 0, 0);

  return start < nextDay && end > dayStart;
}

function formatTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function statusLabel(status) {
  if (status === 'ACEITO') return 'Confirmado';
  if (status === 'RECUSADO') return 'Recusado';
  return 'Pendente de confirmação';
}

function categoryLabel(category) {
  const normalized = normalizeCategory(category);
  if (normalized === 'MISSA') return 'Missa';
  if (normalized === 'SACRAMENTO') return 'Sacramento';
  if (normalized === 'EVENTO COMUM' || normalized === 'EVENTO') return 'Evento';
  return category || 'Compromisso';
}

function categoryIcon(category) {
  const normalized = normalizeCategory(category);
  if (normalized === 'MISSA') return 'church';
  if (normalized === 'SACRAMENTO') return 'cross';
  return 'calendar-alt';
}

export default function CalendarioScreen() {
  const now = new Date();
  const [mesAtual, setMesAtual] = useState(now.getMonth());
  const [anoAtual, setAnoAtual] = useState(now.getFullYear());
  const [diaSelecionado, setDiaSelecionado] = useState(now.getDate());
  const [filtro, setFiltro] = useState('TODOS');

  // A API usa mês entre 1 e 12.
  const { items, loading, error, reload } = useCalendar(anoAtual, mesAtual + 1);

  useFocusEffect(
    useCallback(() => {
      reload().catch(() => {});
    }, [reload])
  );

  useEffect(() => {
    const current = new Date();
    const viewingCurrentMonth =
      current.getFullYear() === anoAtual && current.getMonth() === mesAtual;

    setDiaSelecionado(viewingCurrentMonth ? current.getDate() : 1);
  }, [anoAtual, mesAtual]);

  const quantidadeDias = new Date(anoAtual, mesAtual + 1, 0).getDate();
  const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();

  const dias = useMemo(() => {
    const result = [];

    for (let i = 0; i < primeiroDia; i += 1) result.push(null);
    for (let i = 1; i <= quantidadeDias; i += 1) result.push(i);

    return result;
  }, [primeiroDia, quantidadeDias]);

  const filteredItems = useMemo(
    () => items.filter((item) => matchesFilter(item, filtro)),
    [items, filtro]
  );

  const selectedItems = useMemo(
    () =>
      filteredItems.filter((item) =>
        overlapsDay(item, anoAtual, mesAtual, diaSelecionado)
      ),
    [filteredItems, anoAtual, mesAtual, diaSelecionado]
  );

  function mesAnterior() {
    if (mesAtual === 0) {
      setMesAtual(11);
      setAnoAtual((current) => current - 1);
    } else {
      setMesAtual((current) => current - 1);
    }
  }

  function proximoMes() {
    if (mesAtual === 11) {
      setMesAtual(0);
      setAnoAtual((current) => current + 1);
    } else {
      setMesAtual((current) => current + 1);
    }
  }

  function ehHoje(dia) {
    if (!dia) return false;
    const current = new Date();

    return (
      dia === current.getDate() &&
      mesAtual === current.getMonth() &&
      anoAtual === current.getFullYear()
    );
  }

  function temEvento(dia) {
    if (!dia) return false;
    return filteredItems.some((item) => overlapsDay(item, anoAtual, mesAtual, dia));
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Header title="Calendário" />

        <View style={styles.monthContainer}>
          <TouchableOpacity onPress={mesAnterior} style={styles.arrowButton}>
            <Ionicons name="chevron-back" size={18} color="#7A0D18" />
          </TouchableOpacity>

          <Text style={styles.month}>
            {MESES[mesAtual]} {anoAtual}
          </Text>

          <TouchableOpacity onPress={proximoMes} style={styles.arrowButton}>
            <Ionicons name="chevron-forward" size={18} color="#7A0D18" />
          </TouchableOpacity>
        </View>

        <View style={styles.filters}>
          {[
            ['TODOS', 'Todos'],
            ['MISSA', 'Missa'],
            ['EVENTO', 'Evento'],
            ['SACRAMENTO', 'Sacramento'],
          ].map(([value, label]) => (
            <TouchableOpacity
              key={value}
              onPress={() => setFiltro(value)}
              style={[styles.filterButton, filtro === value && styles.filterButtonActive]}
            >
              <Text
                style={[
                  styles.filterText,
                  filtro === value && styles.filterTextActive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.weekHeader}>
            {DIAS_SEMANA.map((dia) => (
              <Text key={dia} style={styles.weekDay}>
                {dia}
              </Text>
            ))}
          </View>

          <View style={styles.daysContainer}>
            {dias.map((dia, index) => {
              const selected = dia === diaSelecionado;
              const today = ehHoje(dia);
              const hasEvent = temEvento(dia);

              return (
                <TouchableOpacity
                  key={`${dia || 'empty'}-${index}`}
                  style={styles.dayBox}
                  disabled={!dia}
                  onPress={() => dia && setDiaSelecionado(dia)}
                >
                  {dia ? (
                    <View
                      style={[
                        styles.normalDay,
                        today && styles.todayCircle,
                        selected && !today && styles.selectedDay,
                      ]}
                    >
                      <Text
                        style={[
                          styles.day,
                          (today || selected) && styles.selectedDayText,
                        ]}
                      >
                        {dia}
                      </Text>
                      {hasEvent ? (
                        <View
                          style={[
                            styles.eventDot,
                            (today || selected) && styles.eventDotSelected,
                          ]}
                        />
                      ) : null}
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.dayHeader}>
          <Text style={styles.dayHeaderTitle}>
            {diaSelecionado} de {MESES[mesAtual].toLowerCase()}
          </Text>
          <TouchableOpacity onPress={() => reload().catch(() => {})}>
            <Text style={styles.refreshText}>Atualizar</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.stateBox}>
            <ActivityIndicator />
            <Text style={styles.stateText}>Carregando calendário...</Text>
          </View>
        ) : error ? (
          <View style={styles.stateBox}>
            <Text style={styles.stateText}>Não foi possível carregar o calendário.</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => reload().catch(() => {})}
            >
              <Text style={styles.retryText}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : selectedItems.length === 0 ? (
          <View style={styles.stateBox}>
            <Ionicons name="calendar-outline" size={24} color="#7A5B4B" />
            <Text style={styles.stateText}>Nenhum compromisso neste dia.</Text>
          </View>
        ) : (
          selectedItems.map((item) => (
            <View key={item.id} style={styles.eventCard}>
              <View style={styles.eventTitleRow}>
                <FontAwesome5
                  name={categoryIcon(item.event_category)}
                  size={16}
                  color="#284D99"
                />
                <Text style={styles.eventTitle}>
                  {item.event_title || `Evento #${item.event_id}`}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialIcons name="calendar-month" size={20} color="#555" />
                <Text style={styles.info}>{formatDate(item.inicial_date)}</Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="time-outline" size={20} color="#555" />
                <Text style={styles.info}>
                  {formatTime(item.inicial_date)} até {formatTime(item.final_date)}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="bookmark-outline" size={20} color="#555" />
                <Text style={styles.info}>{categoryLabel(item.event_category)}</Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#555" />
                <Text style={styles.info}>{statusLabel(item.status)}</Text>
              </View>

              {item.event_description ? (
                <View style={styles.infoRowTop}>
                  <Ionicons name="information-circle-outline" size={20} color="#555" />
                  <Text style={styles.infoFlexible}>{item.event_description}</Text>
                </View>
              ) : null}

              {item.admin_notes ? (
                <View style={styles.infoRowTop}>
                  <Ionicons name="chatbox-ellipses-outline" size={20} color="#555" />
                  <Text style={styles.infoFlexible}>
                    Secretaria: {item.admin_notes}
                  </Text>
                </View>
              ) : null}
            </View>
          ))
        )}

        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separator}>❦</Text>
          <View style={styles.separatorLine} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0EA',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  monthContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  arrowButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  month: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7A0D18',
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#C7B9AA',
    backgroundColor: '#FFF',
  },
  filterButtonActive: {
    backgroundColor: '#7A0D18',
    borderColor: '#7A0D18',
  },
  filterText: {
    color: '#6F625B',
    fontSize: 11,
    fontWeight: 'bold',
  },
  filterTextActive: {
    color: '#FFF',
  },
  calendarCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#D8CFC6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  weekHeader: {
    flexDirection: 'row',
    backgroundColor: '#7A0D18',
  },
  weekDay: {
    flex: 1,
    color: '#FFF',
    textAlign: 'center',
    paddingVertical: 5,
    fontSize: 11,
    fontWeight: 'bold',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayBox: {
    width: '14.2857%',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5DED7',
  },
  normalDay: {
    width: 29,
    height: 29,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  day: {
    color: '#444',
    fontSize: 11,
  },
  todayCircle: {
    backgroundColor: '#7A0D18',
  },
  selectedDay: {
    backgroundColor: '#9B6D70',
  },
  selectedDayText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  eventDot: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#284D99',
  },
  eventDotSelected: {
    backgroundColor: '#FFF',
  },
  dayHeader: {
    marginHorizontal: 15,
    marginTop: 14,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayHeaderTitle: {
    color: '#7A0D18',
    fontWeight: 'bold',
    fontSize: 16,
  },
  refreshText: {
    color: '#284D99',
    fontWeight: 'bold',
    fontSize: 12,
  },
  stateBox: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginTop: 4,
    minHeight: 90,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D8CFC6',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  stateText: {
    color: '#6F625B',
    textAlign: 'center',
  },
  retryButton: {
    borderWidth: 1,
    borderColor: '#7A5B4B',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  retryText: {
    color: '#7A5B4B',
    fontWeight: 'bold',
  },
  eventCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginTop: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D8CFC6',
    borderRadius: 5,
  },
  eventTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    color: '#284D99',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 7,
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoRowTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  info: {
    marginLeft: 6,
    fontSize: 14,
    color: '#222',
  },
  infoFlexible: {
    marginLeft: 6,
    fontSize: 14,
    color: '#222',
    flex: 1,
    lineHeight: 19,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 12,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#C7B9AA',
  },
  separator: {
    color: '#C7A46B',
    fontSize: 20,
    marginHorizontal: 8,
  },
});
