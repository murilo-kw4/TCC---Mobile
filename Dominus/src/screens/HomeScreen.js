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

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Ionicons
            name="business"
            size={55}
            color="#D8B36A"
          />

          <Text style={styles.logoText}>
            Dominus
          </Text>
        </View>

        {/* CALENDÁRIO */}
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

          <View style={styles.calendarHeader}>
            <Text style={styles.calendarMonth}>
              Maio 5 - Maio 11
            </Text>
          </View>

          <View style={styles.calendar}>
            {['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(day => (
              <Text key={day} style={styles.day}>
                {day}
              </Text>
            ))}

            {[5,6,7,8,9,10,11].map(num => (
              <View
                key={num}
                style={num === 8 ? styles.activeDay : styles.dayBox}
              >
                <Text
                  style={
                    num === 8
                    ? styles.activeDayText
                    : styles.dayNumber
                  }
                >
                  {num}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity>
            <Text style={styles.link}>
              Ver calendário completo
            </Text>
          </TouchableOpacity>

        </View>

        {/* EVENTOS */}
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

        {/* AVISOS */}
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

  container: {
    flex: 1,
    backgroundColor: '#F5F0EA'
  },

  header: {
    backgroundColor: '#7A0D18',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },

  logoText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold'
  },

  section: {
    padding: 15
  },

  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },

  title: {
    marginLeft: 8,
    fontSize: 18,
    color: '#7A0D18',
    fontWeight: 'bold'
  },

  calendarHeader: {
    backgroundColor: '#7A0D18',
    padding: 8,
    borderRadius: 5
  },

  calendarMonth: {
    color: '#FFF',
    textAlign: 'center'
  },

  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },

  day: {
    width: '14%',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  dayBox: {
    width: '14%',
    alignItems: 'center',
    marginTop: 10
  },

  activeDay: {
    width: '14%',
    alignItems: 'center',
    marginTop: 10
  },

  activeDayText: {
    backgroundColor: '#7A0D18',
    color: '#FFF',
    width: 28,
    height: 28,
    borderRadius: 14,
    textAlign: 'center',
    lineHeight: 28
  },

  dayNumber: {
    color: '#333'
  },

  link: {
    textAlign: 'center',
    marginTop: 15,
    color: '#7A0D18'
  },

  card: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 15
  },

  eventTitle: {
    color: '#A35A00',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8
  },

  info: {
    marginBottom: 5
  },

  notice: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10
  },

  noticeTitle: {
    color: '#6B2226',
    fontWeight: 'bold'
  },

  noticeDate: {
    color: '#666',
    marginTop: 3
  },

  bottomMenu: {
    height: 70,
    backgroundColor: '#7A0D18',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  menuItem: {
    alignItems: 'center'
  },

  menuText: {
    color: '#FFF',
    fontSize: 11,
    marginTop: 2
  }

});