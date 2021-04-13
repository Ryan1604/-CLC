import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Gap} from '..';
import normalize from 'react-native-normalize';

const Button = ({
  text,
  color = '#181818',
  textColor = '#FFFFFF',
  onPress,
  icon,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container(color)}>
        {icon}
        <Gap width={5} />
        <Text style={styles.text(textColor)}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (color) => ({
    flexDirection: 'row',
    backgroundColor: color,
    padding: normalize(17),
    borderRadius: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
  }),
  text: (textColor) => ({
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(18),
    color: textColor,
    textAlign: 'center',
  }),
});
