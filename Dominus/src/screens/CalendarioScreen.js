import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import {
  Ionicons,
  MaterialIcons,
  FontAwesome5
} from '@expo/vector-icons';

import Header from '../components/Header';

export default function CalendarioScreen() {

  // =====================================================
  // DATA ATUAL
  // =====================================================

  const hoje = new Date();

  // Mês e ano que estão sendo visualizados
  const [mesAtual, setMesAtual] = useState(hoje.getMonth());
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());


  // =====================================================
  // NOMES
  // =====================================================

  const meses = [
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
    'Dezembro'
  ];

  const diasSemana = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sáb'
  ];


  // =====================================================
  // QUANTIDADE DE DIAS DO MÊS
  // =====================================================

  const quantidadeDias =
    new Date(anoAtual, mesAtual + 1, 0).getDate();


  // =====================================================
  // DIA DA SEMANA EM QUE O MÊS COMEÇA
  // =====================================================

  const primeiroDia =
    new Date(anoAtual, mesAtual, 1).getDay();


  // =====================================================
  // MONTA OS DIAS DO CALENDÁRIO
  // =====================================================

  const dias = [];

  // Espaços antes do primeiro dia
  for (let i = 0; i < primeiroDia; i++) {
    dias.push(null);
  }

  // Dias do mês
  for (let i = 1; i <= quantidadeDias; i++) {
    dias.push(i);
  }


  // =====================================================
  // MUDAR MÊS
  // =====================================================

  const mesAnterior = () => {

    if (mesAtual === 0) {

      setMesAtual(11);
      setAnoAtual(anoAtual - 1);

    } else {

      setMesAtual(mesAtual - 1);

    }

  };


  const proximoMes = () => {

    if (mesAtual === 11) {

      setMesAtual(0);
      setAnoAtual(anoAtual + 1);

    } else {

      setMesAtual(mesAtual + 1);

    }

  };


  // =====================================================
  // VERIFICA SE É HOJE
  // =====================================================

  const ehHoje = (dia) => {

    if (!dia) {
      return false;
    }

    return (
      dia === hoje.getDate() &&
      mesAtual === hoje.getMonth() &&
      anoAtual === hoje.getFullYear()
    );

  };


  // =====================================================
  // RETORNO
  // =====================================================

  return (

    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <Header title="Calendário" />


        {/* =================================================
            MÊS
        ================================================= */}

        <View style={styles.monthContainer}>

          <TouchableOpacity
            onPress={mesAnterior}
            style={styles.arrowButton}
          >

            <Ionicons
              name="chevron-back"
              size={18}
              color="#7A0D18"
            />

          </TouchableOpacity>


          <Text style={styles.month}>

            {meses[mesAtual]} {anoAtual}

          </Text>


          <TouchableOpacity
            onPress={proximoMes}
            style={styles.arrowButton}
          >

            <Ionicons
              name="chevron-forward"
              size={18}
              color="#7A0D18"
            />

          </TouchableOpacity>

        </View>


        {/* =================================================
            CALENDÁRIO
        ================================================= */}

        <View style={styles.calendarCard}>

          {/* DIAS DA SEMANA */}

          <View style={styles.weekHeader}>

            {diasSemana.map((dia) => (

              <Text
                key={dia}
                style={styles.weekDay}
              >

                {dia}

              </Text>

            ))}

          </View>


          {/* DIAS */}

          <View style={styles.daysContainer}>

            {dias.map((dia, index) => (

              <View
                key={index}
                style={styles.dayBox}
              >

                {dia ? (

                  <View
                    style={
                      ehHoje(dia)
                        ? styles.todayCircle
                        : styles.normalDay
                    }
                  >

                    <Text
                      style={
                        ehHoje(dia)
                          ? styles.todayText
                          : styles.day
                      }
                    >

                      {dia}

                    </Text>

                  </View>

                ) : null}

              </View>

            ))}

          </View>

        </View>


        {/* =================================================
            EVENTO DO DIA
        ================================================= */}

        <View style={styles.eventCard}>

          <View style={styles.eventTitleRow}>

            <FontAwesome5
              name="church"
              size={16}
              color="#284D99"
            />

            <Text style={styles.eventTitle}>
              Missa de São José
            </Text>

          </View>


          <View style={styles.infoRow}>

            <MaterialIcons
              name="calendar-month"
              size={20}
              color="#555"
            />

            <Text style={styles.info}>
              12 de maio
            </Text>

          </View>


          <View style={styles.infoRow}>

            <Ionicons
              name="location"
              size={20}
              color="#555"
            />

            <Text style={styles.info}>
              Igreja Matriz
            </Text>

          </View>


          <View style={styles.infoRow}>

            <Ionicons
              name="time-outline"
              size={20}
              color="#555"
            />

            <Text style={styles.info}>
              19:00 hr
            </Text>

          </View>


          <View style={styles.infoRow}>

            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#555"
            />

            <Text style={styles.info}>
              Celebração especial
            </Text>

          </View>

        </View>


        {/* =================================================
            SEPARADOR
        ================================================= */}

        <View style={styles.separatorContainer}>

          <View style={styles.separatorLine} />

          <Text style={styles.separator}>
            ❦
          </Text>

          <View style={styles.separatorLine} />

        </View>


        {/* =================================================
            BOTÕES
        ================================================= */}

        <View style={styles.buttons}>

          <TouchableOpacity
            style={[
              styles.btn,
              styles.missa
            ]}
          >

            <Text style={styles.btnText}>
              + Missa
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            style={[
              styles.btn,
              styles.evento
            ]}
          >

            <Text style={styles.btnText}>
              ▣ Evento
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            style={[
              styles.btn,
              styles.sacramento
            ]}
          >

            <Text style={styles.btnText}>
              ⛪ Sacramento
            </Text>

          </TouchableOpacity>

        </View>

      </ScrollView>

    </View>

  );

}


// =====================================================
// ESTILOS
// =====================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F0EA',
  },


  scrollContent: {
    paddingBottom: 30,
  },


  // ===================================================
  // MÊS
  // ===================================================

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


  // ===================================================
  // CALENDÁRIO
  // ===================================================

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
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5DED7',
  },


  normalDay: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },


  day: {
    color: '#444',
    fontSize: 11,
  },


  // ===================================================
  // DIA ATUAL
  // ===================================================

  todayCircle: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#7A0D18',
    justifyContent: 'center',
    alignItems: 'center',
  },


  todayText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },


  // ===================================================
  // EVENTO
  // ===================================================

  eventCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginTop: 10,
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
  },


  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },


  info: {
    marginLeft: 6,
    fontSize: 14,
    color: '#222',
  },


  // ===================================================
  // SEPARADOR
  // ===================================================

  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 8,
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


  // ===================================================
  // BOTÕES
  // ===================================================

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 5,
  },


  btn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 2,
    minWidth: 75,
    alignItems: 'center',
  },


  missa: {
    backgroundColor: '#284D99',
  },


  evento: {
    backgroundColor: '#D57A18',
  },


  sacramento: {
    backgroundColor: '#657A39',
  },


  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 11,
  },

});