import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
} from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps{
  title: string;
  active?: boolean;
}

export function EnviromentButtonProps({
  title,
  active = false,
  ... rest
}: EnviromentButtonProps) {
  return (
    <RectButton
      style={[
        style.container,
        active && style.containerActive
      ]}
      {...rest}>
      <Text
        style={[
          style.text,
          active && style.textActive
        ]}>
        { title }
      </Text>
    </RectButton>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    width: 76,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 6
    

  },
  containerActive: {
    backgroundColor: colors.green_light
  },
  text:
  {
    color: colors.heading,
    fontFamily: fonts.text
  },
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  }
})