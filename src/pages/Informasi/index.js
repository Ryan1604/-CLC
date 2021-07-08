import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import normalize from 'react-native-normalize';
import {Header} from '../../components';

const Informasi = () => {
  return (
    <View style={styles.page}>
      <Header title="Informasi Aplikasi" />
      <View style={styles.content}>
        <Text style={styles.text}>
          Aplikasi yang akan digunakan untuk Laporan Keuangan Sekolah Indonesia
          di Malaysia
        </Text>
      </View>
    </View>
  );
};

export default Informasi;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingVertical: normalize(40),
    paddingHorizontal: normalize(40),
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(14),
    color: '#020202',
  },
});
