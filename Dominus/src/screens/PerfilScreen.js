import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../services/api';

export default function PerfilScreen() {
  const { user, logout } = useAuth();

  const photoUri = user?.photo
    ? user.photo.startsWith('http')
      ? user.photo
      : `${API_URL}${user.photo}`
    : null;

  function handleLogout() {
    Alert.alert('Sair do Dominus', 'Deseja encerrar sua sessão?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header title="Perfil" />

      <View style={styles.profileCard}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Ionicons name="person" size={58} color="#7A0D18" />
          </View>
        )}

        <Text style={styles.name}>{user?.name || 'Fiel'}</Text>
        <Text style={styles.email}>{user?.email || ''}</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialIcons name="edit" size={22} color="#6B2226" />
          <Text style={styles.menuText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="lock-closed" size={22} color="#6B2226" />
          <Text style={styles.menuText}>Alterar Senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="notifications" size={22} color="#6B2226" />
          <Text style={styles.menuText}>Preferências de Avisos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="information-circle" size={22} color="#6B2226" />
          <Text style={styles.menuText}>Sobre o Aplicativo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Feather name="log-out" size={22} color="#B22222" />
          <Text style={[styles.menuText, { color: '#B22222' }]}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.separator}>❦</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0EA',
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 25,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#D8B36A',
  },
  avatarPlaceholder: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6B2226',
  },
  email: {
    marginTop: 4,
    color: '#666',
  },
  menu: {
    marginHorizontal: 15,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#6B2226',
  },
  separator: {
    textAlign: 'center',
    color: '#C8A96B',
    fontSize: 22,
    marginVertical: 20,
  },
});
