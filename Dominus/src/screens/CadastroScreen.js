import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function CadastroScreen({ navigation }) {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Ionicons name="business" size={55} color="#D8B36A" />
        <Text style={styles.title}>Cadastro</Text>
      </View>

      <Text style={styles.separator}>❦</Text>

      <Text style={styles.label}>
        Nome Completo
      </Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name="person"
          size={22}
          color="#6A5243"
        />

        <TextInput
          placeholder="Digite seu nome completo"
          style={styles.input}
        />
      </View>

      <Text style={styles.label}>
        E-mail
      </Text>

      <View style={styles.inputContainer}>
        <MaterialIcons
          name="email"
          size={22}
          color="#6A5243"
        />

        <TextInput
          placeholder="Digite seu e-mail"
          style={styles.input}
        />
      </View>

      <Text style={styles.label}>
        Senha
      </Text>

      <View style={styles.inputContainer}>
        <MaterialIcons
          name="lock"
          size={22}
          color="#6A5243"
        />

        <TextInput
          secureTextEntry={!showPassword}
          placeholder="Digite sua senha"
          style={styles.input}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={22}
            color="#6A5243"
          />
        </TouchableOpacity>

      </View>

      <TouchableOpacity style={styles.button}>
        <Ionicons
          name="business"
          size={18}
          color="#FFF"
        />

        <Text style={styles.buttonText}>
          Cadastrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.bottomLink}>
          Já tem uma conta? Faça login.
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F6F1EB',
    paddingHorizontal:25
  },

  header:{
    height:170,
    backgroundColor:'#7A0D18',
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:-25,
    marginBottom:20
  },

  title:{
    color:'#FFF',
    fontSize:34,
    fontWeight:'bold'
  },

  separator:{
    textAlign:'center',
    color:'#C6A47B',
    fontSize:22,
    marginBottom:30
  },

  label:{
    color:'#6B2226',
    fontWeight:'bold',
    marginBottom:8,
    fontSize:16
  },

  inputContainer:{
    flexDirection:'row',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#D3C4B7',
    backgroundColor:'#FFF',
    borderRadius:4,
    paddingHorizontal:10,
    marginBottom:25,
    height:50
  },

  input:{
    flex:1,
    marginLeft:10
  },

  button:{
    backgroundColor:'#34539C',
    height:50,
    borderRadius:4,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    marginTop:15
  },

  buttonText:{
    color:'#FFF',
    fontWeight:'bold',
    fontSize:17,
    marginLeft:8
  },

  bottomLink:{
    textAlign:'center',
    color:'#6A5243',
    marginTop:25,
    textDecorationLine:'underline'
  }
});