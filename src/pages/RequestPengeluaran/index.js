import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Header, TextInput} from '../../components';

const RequestPengeluaran = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        title="Alihkan Sisa Dana"
        onBack
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <TextInput placeholder="Masukkan Tujuan Pengeluaran" />
            <TextInput placeholder="Masukkan Nominal" />
          </View>
        </ScrollView>
        <View style={styles.button}>
          <Button text="Simpan" />
        </View>
      </View>
    </View>
  );
};

export default RequestPengeluaran;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 20,
    marginBottom: 67,
  },
});
