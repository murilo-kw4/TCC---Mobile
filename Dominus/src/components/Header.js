import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';

const logo = require('../assets/logo.png');
const fundo = require('../assets/fundo.png');

export default function Header({ title }) {
  return (
    <ImageBackground
      source={fundo}
      style={styles.header}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.conteudo}>

        <Image
          source={logo}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          {title}
        </Text>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  header: {
    width: '100%',
    height: 110,
    marginTop: 20,
  },

  backgroundImage: {
    resizeMode: 'cover',
  },

  conteudo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },

  logo: {
    width: "90%",
    marginBottom: 5,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    top: "55%"
  },

});