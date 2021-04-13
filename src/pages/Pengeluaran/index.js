import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Gap, Header, ListRequest, Number} from '../../components';
import {getSaldo} from '../../redux/action/auth';
import storage from '../../utils/storage';

const Pengeluaran = ({navigation}) => {
  const dispatch = useDispatch();
  const [rupiah, setRupiah] = useState(0);
  const [ringgit, setRinggit] = useState(0);
  const [id, setId] = useState('');
  const [token, setToken] = useState('');
  const {saldoReducer} = useSelector((state) => state);
  const [dataUdah, setDataUdah] = useState([]);
  const [dataBelum, setDataBelum] = useState([]);

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
        setId(result.cabang.id);
        Axios.get(`${API_HOST.url}realisasi/${result.cabang.id}?status=2`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            setDataUdah(res.data.udah);
            setDataBelum(res.data.belum);
          })
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(getSaldo(id));
    setRupiah(saldoReducer.saldo.total_rupiah);
    setRinggit(saldoReducer.saldo.total_ringgit);
  }, [
    API_HOST.url,
    dispatch,
    id,
    saldoReducer.saldo.total_rupiah,
    saldoReducer.saldo.total_ringgit,
    token,
  ]);

  return (
    <View style={styles.page}>
      <Header title="Realisasi" />
      <View style={styles.container}>
        <View style={styles.right}>
          <Text style={styles.label}>Saldo (RM)</Text>
          <Number number={ringgit} style={styles.amount} prefix="RM " />
        </View>
        <View style={styles.left}>
          <Text style={styles.label}>Saldo (Rp)</Text>
          <Number number={rupiah} style={styles.amount} prefix="Rp. " />
        </View>
        <View style={styles.line} />
      </View>
      <View style={styles.content}>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.request}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ListPengeluaran')}>
            <Text style={styles.requestText}>Dana Sisa</Text>
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
        {dataBelum.map((item) => {
          return (
            <ListRequest
              key={item.id}
              kode={item.kode}
              name={item.nama}
              status="Belum Dibelanjakan"
              type="Check"
              onPress={() => navigation.navigate('AddPengeluaran', item)}
            />
          );
        })}
        {/* Jika Sudah Status Sudah Dibelanjakan, Beralih ke Detail */}
        {dataUdah.map((item) => {
          return (
            <ListRequest
              key={item.id}
              kode={item.kode}
              name={item.nama}
              status="Sudah Dibelanjakan"
              type="Check"
              onPress={() => navigation.navigate('DetailPengeluaran', item)}
            />
          );
        })}
      </View>
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
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  line: {
    width: 20,
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
    fontSize: 12,
    color: '#202F45',
    marginBottom: 8,
  },
  amount: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    color: '#FED330',
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  add: {
    flex: 1,
    backgroundColor: '#181818',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  addText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#FFF',
  },
  request: {
    flex: 1,
    backgroundColor: '#181818',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  check: {
    flex: 1,
    backgroundColor: '#181818',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  requestText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#FFF',
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    paddingHorizontal: 24,
  },
  list: {
    flexDirection: 'row',
    paddingLeft: 31,
    paddingRight: 51,
    alignItems: 'center',
    marginTop: 15,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  name: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#000000',
  },
  jumlah: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    color: '#6D6D6D',
  },
});
