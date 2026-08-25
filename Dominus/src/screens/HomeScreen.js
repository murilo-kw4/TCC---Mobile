import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  MaterialIcons,
  FontAwesome5,
  Ionicons
} from '@expo/vector-icons';

import Header from '../components/Header';

export default function HomeScreen() {

  // =========================
  // DATA ATUAL
  // =========================

  const hoje = new Date();

  // Encontra o domingo da semana atual
  const inicioSemana = new Date(hoje);
  inicioSemana.setDate(
    hoje.getDate() - hoje.getDay()
  );

  // Cria os 7 dias da semana
  const diasSemana = Array.from(
    { length: 7 },
    (_, index) => {
      const data = new Date(inicioSemana);

      data.setDate(
        inicioSemana.getDate() + index
      );

      return data;
    }
  );

  // Nome dos dias
  const nomesDias = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sáb'
  ];

  // Formata as datas do cabeçalho
  const formatarData = (data) => {
    return data.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
    });
  };

  return (
    <View style={styles.container}>

      {/* =========================
          HEADER
      ========================= */}

      <Header title="Início" />


      <ScrollView
        showsVerticalScrollIndicator={false}
      >


        {/* =========================
            CALENDÁRIO
        ========================= */}

        <View style={styles.section}>

          <View style={styles.sectionTitle}>

            <MaterialIcons
              name="calendar-month"
              size={22}
              color="#7A0D18" 
            />

            <Text style={styles.title}>
              Calendário
            </Text>

          </View>


          {/* SEMANA ATUAL */}

          <View style={styles.calendarHeader}>

            <Text style={styles.calendarMonth}>
              {formatarData(diasSemana[0])} - {formatarData(diasSemana[6])}
            </Text>

          </View>


          {/* DIAS DA SEMANA */}

          <View style={styles.calendar}>

            {diasSemana.map((data, index) => {

              const ehHoje =
                data.toDateString() ===
                hoje.toDateString();

              return (
                <View
                  key={data.toISOString()}
                  style={styles.calendarColumn}
                >

                  {/* NOME DO DIA */}

                  <Text style={styles.day}>
                    {nomesDias[index]}
                  </Text>


                  {/* NÚMERO DO DIA */}

                  <View
                    style={
                      ehHoje
                        ? styles.activeDay
                        : styles.dayBox
                    }
                  >

                    <Text
                      style={
                        ehHoje
                          ? styles.activeDayText
                          : styles.dayNumber
                      }
                    >
                      {data.getDate()}
                    </Text>

                  </View>

                </View>
              );

            })}

          </View>


          <TouchableOpacity>

            <Text style={styles.link}>
              Ver calendário completo
            </Text>

          </TouchableOpacity>

        </View>



        {/* =========================
            EVENTOS
        ========================= */}

        <View style={styles.section}>

          <View style={styles.sectionTitle}>

            <FontAwesome5
              name="calendar-alt"
              size={18}
              color="#7A0D18"
            />

            <Text style={styles.title}>
              Próximos Eventos
            </Text>

          </View>


          <View style={styles.card}>

            <Text style={styles.eventTitle}>
              Noite de Louvor
            </Text>

            <Text style={styles.info}>
              📅 11 de maio
            </Text>

            <Text style={styles.info}>
              📍 Igreja Matriz
            </Text>

            <Text style={styles.info}>
              🕒 20:00 hr
            </Text>

            <Text style={styles.info}>
              ℹ Evento especial
            </Text>

          </View>

        </View>



        {/* =========================
            AVISOS
        ========================= */}

        <View style={styles.section}>

          <View style={styles.sectionTitle}>

            <Ionicons
              name="notifications"
              size={20}
              color="#7A0D18"
            />

            <Text style={styles.title}>
              Avisos Paroquiais
            </Text>

          </View>


          <View style={styles.notice}>

            <Text style={styles.noticeTitle}>
              Inscrições para batismo abertas
            </Text>

            <Text style={styles.noticeDate}>
              Até 30 de maio
            </Text>

          </View>


          <View style={styles.notice}>

            <Text style={styles.noticeTitle}>
              Festa da padroeira neste domingo
            </Text>

            <Text style={styles.noticeDate}>
              Dia 8 de maio
            </Text>

          </View>

        </View>

      </ScrollView>

    </View>
  );
}



const styles = StyleSheet.create({

  // =========================
  // CONTAINER
  // =========================

  container: {
    flex: 1,
    backgroundColor: '#F5F0EA',
  },


  // =========================
  // SEÇÕES
  // =========================

  section: {
    padding: 15,
  },


  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },


  title: {
    marginLeft: 8,
    fontSize: 18,
    color: '#7A0D18',
    fontWeight: 'bold',
  },


  // =========================
  // CABEÇALHO DO CALENDÁRIO
  // =========================

  calendarHeader: {
    backgroundColor: '#7A0D18',
    padding: 8,
    borderRadius: 5,
  },


  calendarMonth: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '500',
  },


  // =========================
  // CALENDÁRIO
  // =========================

  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },


  calendarColumn: {
    width: '14%',
    alignItems: 'center',
  },


  day: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },


  dayBox: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },


  dayNumber: {
    color: '#333',
    fontSize: 15,
  },


  // =========================
  // DIA ATUAL
  // =========================

  activeDay: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#7A0D18',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },


  activeDayText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },


  // =========================
  // LINK
  // =========================

  link: {
    textAlign: 'center',
    marginTop: 15,
    color: '#7A0D18',
    fontWeight: '500',
  },


  // =========================
  // CARD DE EVENTO
  // =========================

  card: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 15,
  },


  eventTitle: {
    color: '#A35A00',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },


  info: {
    marginBottom: 5,
    color: '#333',
  },


  // =========================
  // AVISOS
  // =========================

  notice: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },


  noticeTitle: {
    color: '#6B2226',
    fontWeight: 'bold',
  },


  noticeDate: {
    color: '#666',
    marginTop: 3,
  },

});