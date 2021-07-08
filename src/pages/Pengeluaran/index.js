import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import normalize from 'react-native-normalize';
import {IcArrowRight} from '../../assets';
import {Gap, Header} from '../../components';
import {API_HOST} from '../../config/API';
import {getData} from '../../utils/storage';

const Pengeluaran = ({navigation}) => {
  const [data, setData] = useState([]);
  // Get Data
  useEffect(() => {
    const source = Axios.CancelToken.source();
    getData('profile').then((res) => {
      const getDataRealisasi = async () => {
        try {
          const result = await Axios.get(`${API_HOST.url}code-1-8`, {
            cancelToken: source.token,
          });
          setData(result.data.code);
        } catch (err) {
          if (Axios.isCancel(err)) {
          } else {
            throw err;
          }
        }
      };
      getDataRealisasi();
    });
    return () => {
      source.cancel();
    };
  });

  return (
    <View style={styles.page}>
      <Header title="Realisasi" />
      <View style={styles.content}>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.request}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ListPengeluaran')}>
            <Text style={styles.requestText}>Dana Lebih</Text>
          </TouchableOpacity>
          <Gap width={10} />
          <TouchableOpacity
            style={styles.request}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('DanaKurang')}>
            <Text style={styles.requestText}>Dana Kurang</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Realisasi</Text>

        <FlatList
          data={data}
          renderItem={(item) => (
            <TouchableOpacity
              style={styles.list}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('AddPengeluaran', item)}>
              <View style={styles.container}>
                <Text style={styles.file}>{item.item.uraian}</Text>
                <Gap height={2} />
              </View>
              <IcArrowRight />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => item.id + index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Gap height={20} />
    </View>
  );
};

export default Pengeluaran;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(10),
  },
  line: {
    width: normalize(20),
    borderRightWidth: 1,
    borderRightColor: '#C4C4C4',
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(12),
    color: '#202F45',
    marginBottom: 8,
  },
  amount: {
    fontFamily: 'Montserrat-Bold',
    fontSize: normalize(18),
    color: '#FED330',
  },
  content: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    marginHorizontal: normalize(20),
    marginVertical: normalize(20),
  },
  add: {
    flex: 1,
    backgroundColor: '#181818',
    borderRadius: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(20),
  },
  addText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: normalize(16),
    color: '#FFF',
  },
  request: {
    flex: 1,
    backgroundColor: '#181818',
    borderRadius: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(20),
  },
  check: {
    flex: 1,
    backgroundColor: '#181818',
    borderRadius: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalize(20),
  },
  requestText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: normalize(16),
    color: '#FFF',
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(18),
    paddingHorizontal: normalize(24),
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
  icon: {
    width: normalize(50),
    height: normalize(50),
    marginRight: normalize(20),
  },
  name: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(16),
    color: '#000000',
  },
  file: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(14),
    color: '#2E2E2E',
  },
  borderBelum: {
    backgroundColor: '#FFE08A',
    paddingHorizontal: normalize(7),
    paddingVertical: normalize(4),
    borderRadius: normalize(5),
    width: normalize(150),
  },
});
