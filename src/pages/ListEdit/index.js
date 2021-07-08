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
import {Gap, Header, Number} from '../../components';
import {API_HOST} from '../../config/API';
import {getData} from '../../utils/storage';

const ListEdit = ({navigation}) => {
  const [data, setData] = useState([]);
  const [NPSN, setNPSN] = useState(null);

  // Get Data Profile
  useEffect(() => {
    getData('profile').then((res) => {
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
        setData(result.data.data);
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
          <Header title="Daftar RAB" />
          <View style={styles.content}>
            <ScrollView>
              {data.map((item) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    key={item.id}
                    onPress={() => navigation.navigate('EditRAB', item)}>
                    <View
                      style={styles.list}
                      activeOpacity={0.7}
                      onPress={() => navigation.navigate('EditRAB', item)}>
                      <View style={styles.containerList}>
                        <View style={styles.row}>
                          <Text style={styles.file}>{item.kode} - </Text>
                          <Text style={styles.file}>{item.nama}</Text>
                        </View>
                        <View>
                          <Number
                            number={item.total_harga_ringgit}
                            style={styles.price}
                            prefix="RM "
                          />
                          <Number
                            number={item.total_harga_rupiah}
                            style={styles.price}
                            prefix="Rp. "
                          />
                        </View>
                      </View>
                      <IcArrowRight />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <Gap height={10} />
          </View>
        </>
      )}
    </View>
  );
};

export default ListEdit;

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
