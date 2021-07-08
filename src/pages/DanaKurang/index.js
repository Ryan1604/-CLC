import Axios from 'axios';
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import {IcArrowRight} from '../../assets';
import {Header, Number} from '../../components';
import storage from '../../utils/storage';

const DanaKurang = ({navigation}) => {
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);

  const API_HOST = {
    url: 'https://api.laporanclcsmp.com/api/v1/',
  };

  useEffect(() => {
    storage
      .load({
        key: 'token',
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          someFlag: true,
        },
      })
      .then((result) => {
        setToken(result);
      })
      .catch((err) => {
        console.log(err);
      });
    storage
      .load({
        key: 'profile',
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          someFlag: true,
        },
      })
      .then((result) => {
        Axios.get(`${API_HOST.url}realisasi/${result.cabang.id}/minus`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            setData(res.data.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [API_HOST.url, token]);

  return (
    <View style={styles.page}>
      {data.length > 0 ? (
        <View style={styles.page}>
          <Header
            title="Daftar Dana Kurang"
            onBack
            onPress={() => navigation.goBack()}
          />
          <View style={styles.content}>
            <ScrollView>
              {data.map((item) => {
                if (item.status === 0) {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.list}
                      activeOpacity={0.7}
                      onPress={() =>
                        navigation.navigate('AlihkanDanaKurang', item)
                      }>
                      <View style={styles.containerList}>
                        <Text style={styles.file}>{item.nama}</Text>
                        <View style={styles.borderProses}>
                          <Number
                            number={item.sisa_rupiah}
                            style={styles.status}
                            prefix="Rp. "
                          />
                        </View>
                      </View>
                      <IcArrowRight />
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <View key={item.id} style={styles.list}>
                      <View style={styles.containerList}>
                        <Text style={styles.file}>{item.nama}</Text>
                        <View style={styles.borderProses}>
                          <Text style={styles.status}>
                            Menunggu Persetujuan
                          </Text>
                        </View>
                      </View>
                      <IcArrowRight />
                    </View>
                  );
                }
              })}
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
    marginBottom: normalize(100),
    marginHorizontal: normalize(20),
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
    paddingHorizontal: normalize(2),
    paddingVertical: normalize(30),
    borderRadius: normalize(20),
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
    width: normalize(350),
  },
  containeModal: {
    flexDirection: 'row',
  },
  RAB: {
    width: normalize(120),
    backgroundColor: '#181818',
    paddingVertical: normalize(20),
    borderRadius: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nonRAB: {
    width: normalize(120),
    backgroundColor: '#181818',
    paddingVertical: normalize(20),
    borderRadius: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textModal: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(14),
    color: '#FFFFFF',
  },
  buttonClose: {
    alignItems: 'flex-end',
  },
  textClose: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(14),
  },
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
  containerList: {flex: 1},
  file: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(16),
    color: '#2E2E2E',
  },
  status: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(10),
    color: '#2E2E2E',
  },
  borderProses: {
    backgroundColor: '#FFE08A',
    paddingHorizontal: normalize(7),
    paddingVertical: normalize(4),
    borderRadius: normalize(5),
    width: normalize(150),
  },
});
