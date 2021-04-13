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
import {showMessage} from '../../utils';
import {FloatingAction} from 'react-native-floating-action';
import normalize from 'react-native-normalize';
import {IcArrowRight} from '../../assets';
import {Button, Gap, Header, Number} from '../../components';
import storage from '../../utils/storage';

const RAB = ({navigation}) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [id, setId] = useState('');
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('');

  const API_HOST = {
    url: 'https://api.laporanclcsmp.com/api/v1/',
  };

  useEffect(() => {
    storage
      .load({
        key: 'token',
      })
      .then((res) => {
        setToken(res);
        storage
          .load({
            key: 'profile',
          })
          .then((result) => {
            setId(result.cabang.id);
            const NPSN = result.cabang.kode;
            Axios.get(`${API_HOST.url}rab/npsn/${NPSN}`, {
              headers: {
                Authorization: `Bearer ${res}`,
              },
            })
              .then((r) => {
                setStatus(r.data.status);
                setData(r.data.data);
                setTotal(r.data.total_harga);
              })
              .catch((err) => {
                console.log(err.response);
              });
          })
          .catch((err) => {
            console.warn(err.message);
          });
      })
      .catch((err) => {
        console.warn(err.message);
      });
  });

  const actions = [
    {
      text: 'Tambah Data',
      icon: require('../../assets/Icons/IcAdd.png'),
      name: 'bt_add',
      position: 1,
      color: '#3D3D3D',
      textStyle: {fontFamily: 'Montserrat-Regular', fontSize: 12},
    },
  ];

  const body = {};

  const onSubmit = () => {
    Axios.post(`${API_HOST.url}rab/ajukan/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => {
        showMessage(r.data.meta.message);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const onCancel = () => {
    Axios.post(`${API_HOST.url}rab/batal/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => {
        showMessage(r.data.meta.message);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <View style={styles.page}>
      {data.length <= 0 || data === undefined ? (
        <View style={styles.null}>
          <LottieView
            source={require('../../assets/Illustrations/NotFound.json')}
            autoPlay
            loop
            style={styles.illustration}
          />
        </View>
      ) : (
        <View style={styles.page}>
          <Header title="Daftar RAB" />
          <View style={styles.content}>
            <ScrollView>
              {data.map((item) => {
                if (status === '2') {
                  return (
                    <View key={item.id}>
                      <View
                        style={styles.list}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('EditRAB', item)}>
                        <View style={styles.containerList}>
                          <View style={styles.row}>
                            <Text style={styles.file}>{item.kode} - </Text>
                            <Text style={styles.file}>{item.nama}</Text>
                          </View>
                          <Number
                            number={item.total_harga_rupiah}
                            style={styles.price}
                            prefix="Rp. "
                          />
                        </View>
                        <IcArrowRight />
                      </View>
                    </View>
                  );
                }
                return (
                  <View key={item.id}>
                    <TouchableOpacity
                      style={styles.list}
                      activeOpacity={0.7}
                      onPress={() => navigation.navigate('EditRAB', item)}>
                      <View style={styles.containerList}>
                        <View style={styles.row}>
                          <Text style={styles.file}>{item.kode} - </Text>
                          <Text style={styles.file}>{item.nama}</Text>
                        </View>
                        <Number
                          number={item.total_harga_rupiah}
                          style={styles.price}
                          prefix="Rp. "
                        />
                      </View>
                      <IcArrowRight />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
            <Gap height={10} />

            {status === '1' && (
              <>
                <View style={styles.totalPrice}>
                  <Text style={styles.label}>Total Harga</Text>
                  <Number number={total} style={styles.total} prefix="Rp. " />
                </View>
                <Gap height={10} />
                <View style={styles.button}>
                  <Button text="Batalkan" color="#D9435E" onPress={onCancel} />
                </View>
              </>
            )}
            {status === '0' && (
              <>
                <View style={styles.totalPrice}>
                  <Text style={styles.label}>Total Harga</Text>
                  <Number number={total} style={styles.total} prefix="Rp. " />
                </View>
                <Gap height={10} />
                <View style={styles.button}>
                  <Button text="Ajukan" color="#181818" onPress={onSubmit} />
                </View>
              </>
            )}
            {status === '3' && (
              <>
                <View style={styles.totalPrice}>
                  <Text style={styles.label}>Total Harga</Text>
                  <Number number={total} style={styles.total} prefix="Rp. " />
                </View>
                <View style={styles.button}>
                  <Button
                    text="Ajukan Kembali"
                    color="#181818"
                    onPress={onSubmit}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      )}

      <FloatingAction
        actions={actions}
        color="#181818"
        onPressItem={(name) => {
          if (name === 'bt_add') {
            navigation.navigate('AddRAB');
          }
        }}
      />
    </View>
  );
};

export default RAB;

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
  totalPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },
  label: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: '#181818',
  },
  total: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    color: '#3D3D3D',
  },
  null: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: 350,
  },
  row: {
    flexDirection: 'row',
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
  containerList: {
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
