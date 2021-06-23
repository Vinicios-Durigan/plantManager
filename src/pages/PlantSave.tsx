import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { useRoute } from '@react-navigation/core';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { color } from 'react-native-reanimated';
import { SvgFromUri } from 'react-native-svg'
import DateTimePucker, { Event } from '@react-native-community/datetimepicker'
import { loadPlant, PlantProps, savePlant } from '../libs/storege';

import waterdrop from '../assets/waterdrop.png'
import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { format, isBefore } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

interface Params{
  plant: PlantProps
}


export function PlantSave() {
  const [selectedDataTime, setSelectedDataTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios' )

  const route = useRoute();
  const { plant } = route.params as Params;

  const navigation = useNavigation();
  
  function handlerChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState);
    }
    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDataTime(new Date());
      return Alert.alert('Escolha um hora no futuro! ⏰')
    }

    if (dateTime)
      setSelectedDataTime(dateTime)
  }

  function handleOpenDataTimePickerAndroid() {
    setShowDatePicker(oldState => !oldState);
  }
  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDataTime
      });
      navigation.navigate('Confirmation', {
        title: 'Tudo Certo!',
        subTitle: 'Fique tranquilo que sempre vamos lembrar voçê de cuidar da sua plantinha com muito cuidado.',
        buttonTitle: 'Muito Obrigrado :D',
        icon: 'hug',
        nextScreen: 'MyPlants'
      });
    } catch{
      Alert.alert('Não Foi Possivel Salvar ⚠')
    }
  }

  return (
    <View style={style.container}>
      
      <View style={style.plantinfo}>
        <SvgFromUri
          uri={plant.photo}
          height={150}
          width={150}
        />
        <Text style={style.plantName}>
          { plant.name }
        </Text>
        <Text style={style.plantAbout}>
          {plant.about}
        </Text>
      </View>
      
      <View style={style.controller }>
          <View style={style.tipcontainer}>
            <Image
              source={waterdrop}
              style={style.tipimage}
            />
            <Text style={style.tipText}>
              {plant.water_tips} 
            </Text>
          </View>
          <Text style={style.alertlabel}>
            Escolha o melhor horário para ser lembrado!
          </Text>
        {
          showDatePicker && (
          <DateTimePucker
          value={selectedDataTime}
          mode='time'
          display='spinner'
          onChange={handlerChangeTime}
         />
          )}
        {
          Platform.OS === 'android' && (
            <TouchableOpacity
              style={style.dataTimePickerButton}
              onPress={handleOpenDataTimePickerAndroid}>
              <Text style={style.dataTimePickerText}>
                {`Mudar ${format(selectedDataTime, 'HH:mm')}`}
              </Text>
            </TouchableOpacity>
          )
        }
          <Button title='Cadastrar Planta'
            onPress={handleSave}
          />
      </View>

    </View>
  )
}
 
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: colors.shape,
  },
  plantinfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10
  },
  tipcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60
  },
  tipimage: {
    width: 56,
    height:56
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify'
  },
  alertlabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5
  },
  dataTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },
  dataTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text
  }
})


