import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';

const fundo = require('../assets/fundo2.png');
const logo = require('../assets/logo.png');

export default function Header({ title }) {
  return (
    <ImageBackground
      source={fundo}
      style={styles.header}
      imageStyle={styles.fundo}
    >

      <View style={styles.conteudo}>

        <Image
          source={logo}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>
          {title}
        </Text>

      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  /*
   * CABEÇALHO
   * Fundo criado no Canva: 1080 x 300 px
   */
  header: {
    width: '100%',
    height: 145,
  },

  /*
   * Configuração do fundo
   */
  fundo: {
    resizeMode: 'cover',
  },

  /*
   * Conteúdo do cabeçalho
   */
  conteudo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },

  /*
   * LOGO
   * Arquivo criado no Canva: 300 x 300 px
   * Tamanho visual no aplicativo: 95 x 95 px
   */
  logo: {
    width: 450,
    height: 450,
    marginBottom: -10,
  },

  /*
   * Nome da página
   */
  titulo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
    position: 'absolute',
    marginTop: '70'
  },

});