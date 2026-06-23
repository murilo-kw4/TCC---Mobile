import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';

import {
  Ionicons,
  MaterialIcons
} from '@expo/vector-icons';

export default function AgendamentoScreen() {

  const [nome, setNome] = useState('');
  const [data, setData] = useState('2026-07-12');
  const [hora, setHora] = useState('15:00');
  const [obs, setObs] = useState('');

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* HEADER */}

      <View style={styles.header}>

        <Ionicons
          name="business"
          size={50}
          color="#D8B36A"
        />

        <Text style={styles.headerTitle}>
          Agendamento
        </Text>

      </View>

      <Text style={styles.separator}>
        ❦
      </Text>

      {/* FORMULÁRIO */}

      <View style={styles.form}>

        <Text style={styles.label}>
          Nome dos Noivos
        </Text>

        <View style={styles.inputContainer}>

          <Ionicons
            name="person"
            size={18}
            color="#7A5B4B"
          />

          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />

        </View>

        <Text style={styles.label}>
          Data
        </Text>

        <View style={styles.inputContainer}>

          <TextInput
            style={styles.input}
            value={data}
            onChangeText={setData}
          />

          <MaterialIcons
            name="calendar-month"
            size={18}
            color="#7A5B4B"
          />

        </View>

        <Text style={styles.label}>
          Hora
        </Text>

        <View style={styles.inputContainer}>

          <TextInput
            style={styles.input}
            value={hora}
            onChangeText={setHora}
          />

          <Ionicons
            name="time-outline"
            size={18}
            color="#7A5B4B"
          />

        </View>

        <Text style={styles.label}>
          Observações (opcional)
        </Text>

        <TextInput
          multiline
          numberOfLines={4}
          value={obs}
          onChangeText={setObs}
          style={styles.textArea}
        />

        <TouchableOpacity style={styles.button}>

          <Text style={styles.buttonText}>
            Cadastrar
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>
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

  headerTitle: {
    color: '#FFF',
    fontSize: 30,
    fontFamily: 'serif'
  },

  separator: {
    textAlign: 'center',
    color: '#C8A96B',
    fontSize: 22,
    marginVertical: 10
  },

  form: {
    padding: 15
  },

  label: {
    color: '#6B2226',
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D5C8BD',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    height: 45
  },

  input: {
    flex: 1,
    marginLeft: 8
  },

  textArea: {
    borderWidth: 1,
    borderColor: '#D5C8BD',
    backgroundColor: '#FFF',
    height: 90,
    padding: 10,
    textAlignVertical: 'top'
  },

  button: {
    backgroundColor: '#284D99',
    marginTop: 25,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold'
  }

});