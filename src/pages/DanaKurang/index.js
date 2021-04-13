/* eslint-disable react-hooks/exhaustive-deps */
import LottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Header, ListRequest} from '../../components';

const DanaKurang = ({navigation}) => {
  const [data] = useState(true);

  return (
    <View style={styles.page}>
      {data ? (
        <View style={styles.page}>
          <Header
            title="Daftar Dana Kurang"
            onBack
            onPress={() => navigation.goBack()}
          />
          <View style={styles.content}>
            <ScrollView>
              <ListRequest
                kode="3.2.1"
                name="Beli Buku"
                amount="100"
                status="Menunggu Persetujuan"
                onPress={() => navigation.navigate('AlihkanDanaKurang')}
              />
            </ScrollView>
          </View>
        </View>
      ) : (
        <View style={styles.null}>
          <LottieView
            source={require('../../assets/Illustrations/NotFound.json')}
            autoPlay
            loop
            style={styles.illustration}
          />
        </View>
      )}
    </View>
  );
};

export default DanaKurang;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    marginBottom: 100,
    marginHorizontal: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 2,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  container: {
    alignItems: 'center',
  },
  null: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: 350,
  },
  containeModal: {
    flexDirection: 'row',
  },
  RAB: {
    width: 120,
    backgroundColor: '#181818',
    paddingVertical: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nonRAB: {
    width: 120,
    backgroundColor: '#181818',
    paddingVertical: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textModal: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  buttonClose: {
    alignItems: 'flex-end',
  },
  textClose: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
});
