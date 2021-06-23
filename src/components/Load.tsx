import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native'

import LottieView from 'lottie-react-native'

import loadAnimation from '../assets/load.json'
import colors from '../styles/colors';

export function Load() {
  return (
    <View style={style.container}>
      <LottieView
        source={loadAnimation}
        autoPlay
        loop
        style={style.animation}
      />
    </View>
  )
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  animation: {
    backgroundColor: 'transparent',
    width: 200,
    height: 200
  }
})