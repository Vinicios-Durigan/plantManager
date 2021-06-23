import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,

} from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { color } from 'react-native-reanimated';
import userImg from '../assets/vinicios.jpg';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
 

export function Header() {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem('@plantmanager:user');
      setUserName(user || '')
    }

    loadStorageUserName();
  }, []);


  return (
    <View style={style.container}>
      <View>
        <Text style={ style.comprimento}>Olá</Text>
        <Text style={style.userName}>{ userName}</Text>
      </View>
      <Image source={userImg} style={ style.image}/>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),

    
  },
  image:{
    width: 70,
    height: 70,
    borderRadius: 40
  },
  comprimento: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text
  },
  userName: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40
  }
})