import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import {
  Ionicons,
  MaterialIcons
} from '@expo/vector-icons';

export default function AvisosScreen() {

  const avisos = [
    {
      id: 1,
      titulo: 'Missa Especial de Domingo',
      data: '08/05/2026',
      descricao: 'Celebração especial com participação do coral.',
      cor: '#FFF7E6',
      borda: '#E5B35C',
      icone: 'church'
    },
    {
      id: 2,
      titulo: 'Campanha do Agasalho',
      data: '10/05/2026',
      descricao: 'Doe roupas para famílias necessitadas.',
      cor: '#EEF4FF',
      borda: '#8CB4FF',
      icone: 'shirt'
    },
    {
      id: 3,
      titulo: 'Encontro de Jovens',
      data: '12/05/2026',
      descricao: 'Tema: fé e comunidade.',
      cor: '#F3FAE7',
      borda: '#A8C66C',
      icone: 'people'
    },
    {
      id: 4,
      titulo: 'Arraiá da Paróquia',
      data: '18/06/2026',
      descricao: 'Festas juninas, comidas típicas e quadrilha.',
      cor: '#FFF4E8',
      borda: '#E8A15C',
      icone: 'bonfire'
    },
    {
      id: 5,
      titulo: 'Adoração ao Santíssimo',
      data: '01/06/2026',
      descricao: 'Momento de adoração ao Santíssimo Sacramento.',
      cor: '#F3F5FF',
      borda: '#8FA4E8',
      icone: 'star'
    }
  ];

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
          Avisos
        </Text>

      </View>

      {/* LISTA */}

      <View style={styles.listContainer}>

        {avisos.map((item) => (

          <View
            key={item.id}
            style={[
              styles.card,
              {
                backgroundColor: item.cor,
                borderColor: item.borda
              }
            ]}
          >

            <View style={styles.row}>

              <Ionicons
                name={item.icone}
                size={18}
                color="#9E7A33"
              />

              <Text style={styles.title}>
                {item.titulo}
              </Text>

            </View>

            <Text style={styles.date}>
              📅 {item.data}
            </Text>

            <Text style={styles.description}>
              {item.descricao}
            </Text>

          </View>

        ))}

      </View>

      <Text style={styles.separator}>
        ❦
      </Text>

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

  listContainer: {
    padding: 15
  },

  card: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginBottom: 12
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },

  title: {
    marginLeft: 6,
    color: '#7A0D18',
    fontWeight: 'bold',
    fontSize: 15
  },

  date: {
    color: '#777',
    fontSize: 12,
    marginBottom: 5
  },

  description: {
    color: '#555',
    fontSize: 13
  },

  separator: {
    textAlign: 'center',
    color: '#C8A96B',
    fontSize: 22,
    marginBottom: 15
  }

});