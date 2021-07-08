import Axios from 'axios';
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import normalize from 'react-native-normalize';
import {useDispatch} from 'react-redux';
import {IcArrowRight} from '../../assets';
import {Button, Gap, Header, Number} from '../../components';
import {API_HOST} from '../../config/API';
import {cancelAction, submitAction} from '../../redux/action/rab';
import {getData} from '../../utils/storage';

const RAB = ({navigation}) => {
  const [data, setData] = useState([]);
  const [rupiah, setRupiah] = useState(0);
  const [ringgit, setRinggit] = useState(0);
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');
  const [NPSN, setNPSN] = useState(null);
  const [fungsi, setFungsi] = useState(0);

  // Get Data Profile
  useEffect(() => {
    getData('profile').then((res) => {
      setId(res.cabang.id);
      setNPSN(res.cabang.kode);
    });
  });

  // Get Data RAB
  useEffect(() => {
    const source = Axios.CancelToken.source();
    const getDataRAB = async () => {
      try {
        const result = await Axios.get(`${API_HOST.url}rab/npsn/${NPSN}`, {
          cancelToken: source.token,
        });

        setStatus(result.data.status);
        setData(result.data.data);
        setRupiah(result.data.total_harga_rupiah);
        setRinggit(result.data.total_harga_ringgit);
        setFungsi(result.data.fungsi);
      } catch (err) {
        if (Axios.isCancel(err)) {
        } else {
          throw err;
        }
      }
    };
    getDataRAB();

    return () => {
      source.cancel();
    };
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

  const onSubmit = async () => {
    dispatch(submitAction(id, navigation));
  };

  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(cancelAction(id));
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
        <>
          <Header title="RAB" />
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
              })}
            </ScrollView>
            <Gap height={10} />

            {status === '1' && (
              <>
                <View style={styles.totalPrice}>
                  <Text style={styles.label}>Jumlah Dana RAB</Text>
                  <View>
                    <Number
                      number={ringgit}
                      style={styles.total}
                      prefix="RM "
                    />
                    <Number
                      number={rupiah}
                      style={styles.total}
                      prefix="Rp. "
                    />
                  </View>
                </View>
                <Gap height={10} />
                <View style={styles.button}>
                  <Button text="Batalkan" color="#D9435E" onPress={onCancel} />
                  <Gap height={20} />
                  <Button
                    text="Preview"
                    color="#181818"
                    onPress={() => navigation.navigate('Preview')}
                  />
                </View>
              </>
            )}
            {status === '0' && (
              <>
                <View style={styles.totalPrice}>
                  <Text style={styles.label}>Jumlah Dana RAB</Text>
                  <View>
                    <Number
                      number={ringgit}
                      style={styles.total}
                      prefix="RM "
                    />
                    <Number
                      number={rupiah}
                      style={styles.total}
                      prefix="Rp. "
                    />
                  </View>
                </View>
                <Gap height={10} />
                <View style={styles.button}>
                  <Button
                    text="Edit Data"
                    color="#181818"
                    onPress={() => navigation.navigate('ListEdit')}
                  />
                  <Gap height={20} />
                  <Button
                    text="Preview"
                    color="#181818"
                    onPress={() => navigation.navigate('Preview', '0')}
                  />
                </View>
              </>
            )}
            {status === '3' && (
              <>
                <View style={styles.totalPrice}>
                  <Text style={styles.label}>Jumlah Dana RAB</Text>
                  <View>
                    <Number
                      number={ringgit}
                      style={styles.total}
                      prefix="RM "
                    />
                    <Number
                      number={rupiah}
                      style={styles.total}
                      prefix="Rp. "
                    />
                  </View>
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
        </>
      )}

      {fungsi === '0' && (
        <FloatingAction
          actions={actions}
          color="#181818"
          onPressItem={(name) => {
            if (name === 'bt_add') {
              navigation.navigate('AddRAB');
            }
          }}
        />
      )}
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
    // flex: 1,
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
  totalPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(28),
  },
  label: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(18),
    color: '#181818',
  },
  total: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(18),
    color: '#3D3D3D',
  },
  null: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: normalize(350),
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
