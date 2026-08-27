import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../services/api';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password) {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
    } catch (error) {
      if (error.message === 'ADMIN_NOT_ALLOWED') {
        Alert.alert('Acesso não permitido', 'O aplicativo mobile é destinado aos fiéis.');
      } else if (error.response?.status === 401) {
        Alert.alert('Não foi possível entrar', 'E-mail ou senha inválidos.');
      } else {
        Alert.alert(
          'Servidor indisponível',
          `Não foi possível conectar ao Dominus.\n\nAPI: ${API_URL}`
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Header title="Perfil" />

      <Text style={styles.separator}>❦</Text>

      <Text style={styles.label}>E-mail</Text>

      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={22} color="#6A5243" />

        <TextInput
          placeholder="Digite seu e-mail"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          editable={!loading}
        />
      </View>

      <Text style={styles.label}>Senha</Text>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={22} color="#6A5243" />

        <TextInput
          placeholder="Digite sua senha"
          secureTextEntry={!showPassword}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          editable={!loading}
          onSubmitEditing={handleLogin}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={loading}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={22}
            color="#6A5243"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <>
            <Ionicons name="business" size={18} color="#FFF" />
            <Text style={styles.buttonText}>Entrar</Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity disabled={loading}>
        <Text style={styles.link}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Cadastro')}
        disabled={loading}
      >
        <Text style={styles.bottomLink}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F1EB',
    paddingHorizontal: 25,
  },
  separator: {
    textAlign: 'center',
    color: '#C6A47B',
    fontSize: 22,
    marginBottom: 30,
  },
  label: {
    color: '#6B2226',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3C4B7',
    backgroundColor: '#FFF',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 25,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#34539C',
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 17,
  },
  link: {
    textAlign: 'center',
    color: '#7A0D18',
    marginTop: 20,
  },
  bottomLink: {
    textAlign: 'center',
    color: '#6A5243',
    marginTop: 'auto',
    marginBottom: 30,
    textDecorationLine: 'underline',
  },
});
