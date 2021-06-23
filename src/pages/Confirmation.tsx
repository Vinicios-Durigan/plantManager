import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  View,
  Platform,
  
} from 'react-native';
import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params{
  title: string,
  subTitle: string,
  buttonTitle: string,
  icon: 'smile' | 'hug',
  nextScreen: string
}

const emoji = {
  hug: '🤗',
  smile: '😀'
}


export function Confirmation() {
  const navigation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subTitle,
    buttonTitle,
    icon,
    nextScreen
  } = routes.params as Params

  function handleMuveOn() {
    navigation.navigate(nextScreen)
  }

  return (
    <SafeAreaView style={ style.container}>
      <View style={ style.content} >
        <Text style={ style.emoji}>
          {emoji[icon]}
        </Text>
        <Text style={style.title}>
          {title}
        </Text>
        <Text style={style.subtitle} >
          {subTitle}
        </Text>
        
        <View style={ style.footer}>
          <Button title={buttonTitle}
            onPress={handleMuveOn}
          />
        </View>
      </View>
     
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    width: '100%',
    padding:30
  },
  header: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 78,
  },
  title:{
    fontSize: 22,
    lineHeight: 38,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 15
  },
  subtitle:{
    fontSize: 17,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    paddingVertical: 10
  },
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20
  }
})