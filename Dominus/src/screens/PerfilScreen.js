import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';

import {
  Ionicons,
  MaterialIcons,
  Feather
} from '@expo/vector-icons';

export default function PerfilScreen() {

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
          Perfil
        </Text>

      </View>

      {/* PERFIL */}

      <View style={styles.profileCard}>

        <Image
          source={{
            uri: 'https://static.poder360.com.br/uploads/2019/01/foto-oficial-Bolsonaro.png'
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          TCC - Dominus
        </Text>

        <Text style={styles.email}>
          admdominus@gmail.com
        </Text>

      </View>

      {/* OPÇÕES */}

      <View style={styles.menu}>

        <TouchableOpacity style={styles.menuItem}>

          <MaterialIcons
            name="edit"
            size={22}
            color="#6B2226"
          />

          <Text style={styles.menuText}>
            Editar Perfil
          </Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>

          <Ionicons
            name="lock-closed"
            size={22}
            color="#6B2226"
          />

          <Text style={styles.menuText}>
            Alterar Senha
          </Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>

          <Ionicons
            name="notifications"
            size={22}
            color="#6B2226"
          />

          <Text style={styles.menuText}>
            Preferências de Avisos
          </Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>

          <Ionicons
            name="information-circle"
            size={22}
            color="#6B2226"
          />

          <Text style={styles.menuText}>
            Sobre o Aplicativo
          </Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>

          <Feather
            name="log-out"
            size={22}
            color="#B22222"
          />

          <Text
            style={[
              styles.menuText,
              { color: '#B22222' }
            ]}
          >
            Sair
          </Text>

        </TouchableOpacity>

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

  profileCard: {
    alignItems: 'center',
    paddingVertical: 25
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#D8B36A'
  },

  name: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6B2226'
  },

  email: {
    marginTop: 4,
    color: '#666'
  },

  menu: {
    marginHorizontal: 15,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },

  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#6B2226'
  },

  separator: {
    textAlign: 'center',
    color: '#C8A96B',
    fontSize: 22,
    marginVertical: 20
  }

});