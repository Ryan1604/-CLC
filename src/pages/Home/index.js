import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import normalize from 'react-native-normalize';
import {IcLogout} from '../../assets';
import {Gap, Number} from '../../components';
import {API_HOST} from '../../config/API';
import {getData} from '../../utils/storage';

const Home = ({navigation}) => {
  const [id, setId] = useState('');
  const [nama, setNama] = useState('');
  const [status, setStatus] = useState('');
  const [NPSN, setNPSN] = useState(null);
  const [jumlahMurid, setJumlahMurid] = useState(0);
  const [jumlahGuru, setJumlahGuru] = useState(0);
  const [rupiah, setRupiah] = useState(0);
  const [ringgit, setRinggit] = useState(0);

  // Get Data Profile
  useEffect(() => {
    getData('profile').then((res) => {
      setId(res.cabang.id);
      setNama(res.user_nama);
      setNPSN(res.cabang.kode);
    });
  }, []);

  // Get Data Cabang
  useEffect(() => {
    const source = Axios.CancelToken.source();
    const getDataCabang = async () => {
      try {
        const result = await Axios.get(`${API_HOST.url}cabang/${id}`, {
          cancelToken: source.token,
        });

        setJumlahMurid(result.data.cabang.total_jumlah_siswa);
        setJumlahGuru(result.data.cabang.total_jumlah_guru);
      } catch (err) {
        if (Axios.isCancel(err)) {
        } else {
          throw err;
        }
      }
    };
    getDataCabang();

    return () => {
      source.cancel();
    };
  });

  // Get Status
  useEffect(() => {
    const getStatus = async () => {
      try {
        const result = await Axios.get(`${API_HOST.url}rab/npsn/${NPSN}`);

        setStatus(result.data.status);
      } catch (err) {
        if (Axios.isCancel(err)) {
        } else {
          throw err;
        }
      }
    };
    getStatus();
  });

  // Get Saldo
  useEffect(() => {
    const source = Axios.CancelToken.source();
    const getSaldo = async () => {
      try {
        const result = await Axios.get(`${API_HOST.url}saldo/${id}`, {
          cancelToken: source.token,
        });

        setRupiah(result.data.saldo.total_rupiah);
        setRinggit(result.data.saldo.total_ringgit);
      } catch (err) {
        if (Axios.isCancel(err)) {
        } else {
          throw err;
        }
      }
    };
    getSaldo();

    return () => {
      source.cancel();
    };
  });

  // Log Out
  const onLogout = () => {
    AsyncStorage.multiRemove(['profile', 'token']).then(() => {
      navigation.reset({index: 0, routes: [{name: 'Login'}]});
    });
  };

  return (
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.username}>Hi, {nama}</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.goTo}>Detail Profile</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={onLogout}>
          <IcLogout />
          <Gap width={8} />
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Gap height={30} />
      <View style={styles.containerSaldo}>
        <View style={styles.right}>
          <Text style={styles.label}>Dana Awal</Text>
          <Number number={ringgit} style={styles.amount} prefix="RM " />
          <Number number={rupiah} style={styles.amount} prefix="Rp. " />
        </View>
        <View style={styles.left}>
          <Text style={styles.label}>Sisa Dana</Text>
          <Number number={ringgit} style={styles.amount} prefix="RM " />
          <Number number={rupiah} style={styles.amount} prefix="Rp. " />
        </View>
        <View style={styles.line} />
      </View>
      <View style={styles.carousel}>
        <LinearGradient
          start={{x: -1, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#FFD700', '#FED330']}
          style={styles.card1}>
          <Text style={styles.titleBlack}>Jumlah Guru</Text>
          <View style={styles.contentCard}>
            <Text style={styles.jumlahBlack}>{jumlahGuru}</Text>
            <Text style={styles.subTitleBlack}>Guru</Text>
          </View>
        </LinearGradient>
        <Gap width={20} />
        <LinearGradient
          start={{x: -1, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#181818', '#3D3D3D']}
          style={styles.card1}>
          <Text style={styles.title}>Jumlah Murid</Text>
          <View style={styles.contentCard}>
            <Text style={styles.jumlah}>{jumlahMurid}</Text>
            <Text style={styles.subTitle}>Murid</Text>
          </View>
        </LinearGradient>
      </View>
      <View style={styles.carousel}>
        <LinearGradient
          start={{x: -1, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#181818', '#3D3D3D']}
          style={styles.card1}>
          <Text style={styles.title}>Total Realisasi</Text>
          <View style={styles.contentCard}>
            <Gap height={10} />
            <Number number={ringgit} style={styles.total} prefix="RM " />
            <Number number={rupiah} style={styles.total} prefix="Rp. " />
          </View>
        </LinearGradient>
        <Gap width={20} />
        <LinearGradient
          start={{x: -1, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#FFD700', '#FED330']}
          style={styles.card1}>
          <Text style={styles.titleBlack}>Jumlah Dana yang dialihkan</Text>
          <View style={styles.contentCard}>
            <Gap height={10} />
            <Number number={ringgit} style={styles.totalBlack} prefix="RM " />
            <Number number={rupiah} style={styles.totalBlack} prefix="Rp. " />
          </View>
        </LinearGradient>
      </View>
      <Gap height={20} />
      {status === '0' && (
        <>
          <LinearGradient
            start={{x: -1, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#181818', '#3D3D3D']}
            style={styles.notifNull}>
            <Text style={styles.textWhite}>Anda Belum Mengusulkan RAB.</Text>
          </LinearGradient>
        </>
      )}
      {status === '1' && (
        <View style={styles.notifProgress}>
          <Text style={styles.textProses}>
            Data RAB sedang proses verifikasi.
          </Text>
        </View>
      )}
      {status === '2' && (
        <View style={styles.notifAcc}>
          <Text style={styles.textWhite}>
            Data RAB sudah disetujui. Silahkan Realisasikan.
          </Text>
        </View>
      )}
      {status === '3' && (
        <View style={styles.notifCancel}>
          <Text style={styles.textWhite}>
            Maaf RAB anda ditolak. Silahkan hubungi Admin.
          </Text>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(22),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(22),
    color: '#2E2E2E',
  },
  goTo: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(14),
    color: '#2E2E2E',
    textDecorationLine: 'underline',
  },
  profile: {
    width: normalize(50),
    height: normalize(50),
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderColor: '#181818',
    paddingVertical: normalize(11),
    paddingHorizontal: normalize(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(30),
    borderWidth: 1,
  },
  carousel: {
    flexDirection: 'row',
    paddingHorizontal: normalize(20),
    marginTop: normalize(20),
  },
  card1: {
    flex: 1,
    borderRadius: normalize(10),
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(20),
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: normalize(15),
    color: '#FFFFFF',
  },
  titleBlack: {
    fontFamily: 'Montserrat-Bold',
    fontSize: normalize(15),
    color: '#3D3D3D',
  },
  jumlah: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(20),
    color: '#FFFFFF',
  },
  jumlahBlack: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(20),
    color: '#3D3D3D',
  },
  subTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(9),
    color: '#FFFFFF',
  },
  subTitleBlack: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(9),
    color: '#3D3D3D',
  },
  container: {
    flex: 1,
  },
  containerSaldo: {
    flexDirection: 'row',
    marginHorizontal: normalize(20),
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(10),
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(12),
    color: '#202F45',
    marginBottom: 8,
  },
  amount: {
    fontFamily: 'Montserrat-Bold',
    fontSize: normalize(14),
    color: '#181818',
  },
  total: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(14),
    color: '#FFFFFF',
  },
  totalBlack: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(14),
    color: '#3D3D3D',
  },
  notifNull: {
    height: '10%',
    backgroundColor: '#181818',
    marginHorizontal: normalize(20),
    marginBottom: normalize(20),
    borderRadius: normalize(10),
    paddingHorizontal: normalize(12),
    justifyContent: 'center',
  },
  notifProgress: {
    height: '10%',
    backgroundColor: '#FED330',
    marginHorizontal: normalize(20),
    marginBottom: normalize(20),
    borderRadius: normalize(10),
    paddingHorizontal: normalize(12),
    justifyContent: 'center',
  },
  notifAcc: {
    height: '10%',
    backgroundColor: '#1ABC9C',
    marginHorizontal: normalize(20),
    marginBottom: normalize(20),
    borderRadius: normalize(10),
    paddingHorizontal: normalize(12),
    justifyContent: 'center',
  },
  notifCancel: {
    height: '10%',
    backgroundColor: '#D9435E',
    marginHorizontal: normalize(20),
    marginBottom: normalize(20),
    borderRadius: normalize(10),
    paddingHorizontal: normalize(12),
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(14),
    color: '#181818',
  },
  textWhite: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(14),
    color: '#FFFFFF',
  },
  textProses: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(14),
    color: '#000000',
  },
});
