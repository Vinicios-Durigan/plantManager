import React, { useEffect, useState } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  FlatList,
  View,

} from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { SvgFromUri } from 'react-native-svg';
import { color } from 'react-native-reanimated';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  }
}

export const PlantCadSecondary = ({ data, ...rest }: PlantProps) => {
  return (
    <RectButton
      style={style.container}
      {... rest}
    >
      <SvgFromUri uri={data.photo} width={50} height={50} />

      <Text style={style.title}> 
        { data.name}
      </Text>
      <View style={style.details}>
        <Text style={style.timeLabel}>
          Regar às
        </Text>
        <Text style={style.time}>
          {data.hour}
        </Text>
      </View>
    </RectButton>

    
  )
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.shape,
    marginVertical: 5
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    fontFamily: fonts.heading,
    color: colors.heading
  },
  details: {
    alignItems: 'flex-end'
  },
  timeLabel: {
    fontSize: 16,
    fontFamily:fonts.text,
    color: colors.body_light,
    paddingRight: 10
    
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark,
    paddingRight: 10
  }
})