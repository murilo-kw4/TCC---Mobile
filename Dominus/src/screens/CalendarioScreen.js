import React from 'react';
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

export default function CalendarioScreen() {

  const diasSemana = [
    'Dom','Seg','Ter','Qua','Qui','Sex','Sáb'
  ];

  const dias = [
    '',1,2,3,4,
    5,6,7,8,9,10,11,
    12,13,14,15,16,17,18,
    19,20,21,22,23,24,25,
    26,27,28,29,30,31,''
  ];

  return (
    <View style={styles.container}>

      <ScrollView>

        {/* HEADER */}

        <View style={styles.header}>

          <View style={styles.logoRow}>
            <View style={styles.line} />

            <Ionicons
              name="business"
              size={45}
              color="#D8B36A"
            />

            <View style={styles.line} />
          </View>

          <Text style={styles.headerTitle}>
            Calendário
          </Text>

        </View>

        {/* MÊS */}

        <View style={styles.monthContainer}>

          <TouchableOpacity>
            <Text style={styles.arrow}>
              ◀
            </Text>
          </TouchableOpacity>

          <Text style={styles.month}>
            Maio 2026
          </Text>

          <TouchableOpacity>
            <Text style={styles.arrow}>
              ▶
            </Text>
          </TouchableOpacity>

        </View>

        {/* CALENDÁRIO */}

        <View style={styles.calendarCard}>

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

          <View style={styles.daysContainer}>
            {dias.map((dia,index)=>(
              <View
                key={index}
                style={styles.dayBox}
              >
                <Text
                  style={
                    dia === 12
                      ? styles.selectedDay
                      : styles.day
                  }
                >
                  {dia}
                </Text>
              </View>
            ))}
          </View>

        </View>

        {/* EVENTO */}

        <View style={styles.eventCard}>

          <Text style={styles.eventTitle}>
            Missa de São José
          </Text>

          <Text style={styles.info}>
            📅 12 de maio
          </Text>

          <Text style={styles.info}>
            📍 Igreja Matriz
          </Text>

          <Text style={styles.info}>
            🕒 19:00 hr
          </Text>

          <Text style={styles.info}>
            ℹ Celebração especial
          </Text>

        </View>

        {/* SEPARADOR */}

        <Text style={styles.separator}>
          ❦
        </Text>

        {/* BOTÕES */}

        <View style={styles.buttons}>

          <TouchableOpacity
            style={[styles.btn, styles.missa]}
          >
            <Text style={styles.btnText}>
              + Missa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.evento]}
          >
            <Text style={styles.btnText}>
              Evento
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.sacramento]}
          >
            <Text style={styles.btnText}>
              Sacramento
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#F5F0EA'
  },

  header:{
    height:150,
    backgroundColor:'#7A0D18',
    justifyContent:'center',
    alignItems:'center'
  },

  logoRow:{
    flexDirection:'row',
    alignItems:'center'
  },

  line:{
    width:70,
    height:1,
    backgroundColor:'#D8B36A',
    marginHorizontal:12
  },

  headerTitle:{
    color:'#FFF',
    fontSize:32,
    fontFamily:'serif'
  },

  monthContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:15
  },

  arrow:{
    fontSize:18,
    color:'#7A0D18',
    marginHorizontal:15
  },

  month:{
    fontWeight:'bold',
    color:'#7A0D18'
  },

  calendarCard:{
    backgroundColor:'#FFF',
    marginHorizontal:15,
    borderWidth:1,
    borderColor:'#DDD'
  },

  weekHeader:{
    flexDirection:'row',
    backgroundColor:'#7A0D18'
  },

  weekDay:{
    flex:1,
    color:'#FFF',
    textAlign:'center',
    paddingVertical:5,
    fontSize:12
  },

  daysContainer:{
    flexDirection:'row',
    flexWrap:'wrap'
  },

  dayBox:{
    width:'14.28%',
    height:38,
    justifyContent:'center',
    alignItems:'center'
  },

  day:{
    color:'#444'
  },

  selectedDay:{
    backgroundColor:'#284D99',
    color:'#FFF',
    paddingHorizontal:8,
    paddingVertical:4,
    borderRadius:4
  },

  eventCard:{
    backgroundColor:'#FFF',
    margin:15,
    padding:15,
    borderWidth:1,
    borderColor:'#DDD'
  },

  eventTitle:{
    color:'#284D99',
    fontWeight:'bold',
    fontSize:20,
    marginBottom:10
  },

  info:{
    marginBottom:5,
    fontSize:16
  },

  separator:{
    textAlign:'center',
    color:'#C7A46B',
    fontSize:22
  },

  buttons:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginVertical:20
  },

  btn:{
    paddingVertical:8,
    paddingHorizontal:15,
    borderRadius:4
  },

  missa:{
    backgroundColor:'#284D99'
  },

  evento:{
    backgroundColor:'#D57A18'
  },

  sacramento:{
    backgroundColor:'#657A39'
  },

  btnText:{
    color:'#FFF',
    fontWeight:'bold'
  }

});