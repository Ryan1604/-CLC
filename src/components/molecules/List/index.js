import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcArrowRight} from '../../../assets';
import normalize from 'react-native-normalize';
import {Number} from '..';

const List = ({name, price, onPress}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.list}
        activeOpacity={0.7}
        onPress={onPress}>
        <View style={styles.container}>
          <Text style={styles.file}>{name}</Text>
          <Number number={price} style={styles.price} prefix="Rp. " />
        </View>
        <IcArrowRight />
      </TouchableOpacity>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#C4C4C4',
    marginHorizontal: normalize(35),
    paddingVertical: normalize(20),
    paddingLeft: normalize(14),
    paddingRight: normalize(20),
  },
  container: {
    flex: 1,
  },
  file: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(16),
    color: '#2E2E2E',
  },
  price: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(14),
    color: '#181818',
  },
});
