import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  View,
  Platform,
  Keyboard,
  Alert
  
} from 'react-native';

import { Button } from '../components/Button';
import AsyncStorege from '@react-native-async-storage/async-storage'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIndentification() {

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();
  const navigation = useNavigation();
  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!name);
  }
   function handleInputFocus() {
    setIsFocused(true)
  }
  function handleImputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  async function handleSubmit() {
    if (!name)
      return Alert.alert('Me diz como chamar você  😢')
    try {
      await AsyncStorege.setItem('@plantmanager:user', name);
      navigation.navigate('Confirmation', {
        title: 'Prontinho!',
        subTitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlaintSelect'
        
      })
    } catch{
      return Alert.alert('não Foi possivel salvar o nome do usúario.  😢')
    }

  }

  return (
    <SafeAreaView style={style.container}>
      <KeyboardAvoidingView
        style={style.container}
        behavior={ Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={ Keyboard.dismiss}>
          <View style={ style.content}>
            <View style={style.form}>
              <View style={ style.header}>
                <Text style={ style.emoji}>
                  {isFilled ? '😊 ' : '🤔'}
                </Text>
                <Text style={style.title}>Como podemos {'\n'} chamar você ? </Text>
              </View>
              <TextInput
                style={[
                  style.input,
                  (isFocused || isFilled) && { borderColor: colors.green }
                ]}
                placeholder='Digite seu nome'
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={ handleImputChange}
              />
              <View style={style.footer}>
                <Button title="Confirmar" onPress={ handleSubmit }></Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback> 
      </KeyboardAvoidingView>
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
    width: '100%'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 56,
    alignItems: 'center',
 
  },
  header: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 44
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  title:{
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20
  },
  footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20 
  }
})