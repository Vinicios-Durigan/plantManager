import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  View
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import watering from '../assets/watering.png'
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/native';

export function Welcome() {
  const navigation = useNavigation();
  function handleStart() {
    navigation.navigate('UserIndentification')
  }
  return (
    <SafeAreaView style={style.container}>
      <View style={style.embrulho}>
        <Text style={ style.title}>
          Gerencie{'\n'} suas plantas de {'\n'}forma fácil
        </Text>

        <Image
          source={watering}
          style={style.image}
          resizeMode='contain'
        />

        <Text style={ style.subTitle}>
          Não esqueça mais de regar suas plantas.
          Nós cuidamos de lembar você sempre que precisar
        </Text>

        <TouchableOpacity style={style.button} onPress={ handleStart} >
          
          
            <Feather
              name="chevron-right"
              style={ style.buttonIcon }
            />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
 
  },
  embrulho: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    marginTop: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 34
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width: 56,
    borderRadius: 16,
    marginBottom: 10,
    
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 30,
  },
  image: {

    height: Dimensions.get('window').width * 0.7

  },

})