import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableOpacityProps
} from 'react-native'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps{
  title: string;
}
export function Button( {title, ... rest} : ButtonProps) {
  return (
    <TouchableOpacity style={style.container}
      {...rest} >
      <Text style={style.buttonText}>
        { title }
      </Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({

   container: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: 16,

    
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.heading

  },
})