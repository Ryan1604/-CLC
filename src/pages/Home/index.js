import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import normalize from 'react-native-normalize';
import {Gap} from '../../components';
import storage from '../../utils/storage';

const Home = () => {
  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const [nama, setNama] = useState('');
  const [jumlahMurid, setJumlahMurid] = useState(0);
  const [jumlahGuru, setJumlahGuru] = useState(0);
  const [kosong, setKosong] = useState([]);
  const [ajukan, setAjukan] = useState([]);
  const [accept, setAccept] = useState([]);
  const [denied, setDenied] = useState([]);

  const API_HOST = {
    url: 'https://api.laporanclcsmp.com/api/v1/',
  };

  storage
    .load({
      key: 'profile',
    })
    .then((ret) => {
      setNama(ret.user_nama);
      setId(ret.cabang.id);
    })
    .catch((err) => {
      console.warn(err.message);
    });
  storage
    .load({
      key: 'token',
    })
    .then((resToken) => {
      setToken(resToken);
      Axios.get(`${API_HOST.url}cabang/${id}`, {
        headers: {
          Authorization: `Bearer ${resToken}`,
        },
      })
        .then((result) => {
          setJumlahMurid(result.data.cabang.total_jumlah_siswa);
          setJumlahGuru(result.data.cabang.total_jumlah_guru);
        })
        .catch((err) => {
          console.log(err.response);
        });
    })
    .catch((err) => {
      console.warn(err.message);
    });

  const checkStatus0 = async () => {
    const response = await Axios.get(
      `${API_HOST.url}realisasi/${id}?status=0`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    setKosong(response.data.udah && response.data.belum);
  };

  const checkStatus1 = async () => {
    const response = await Axios.get(
      `${API_HOST.url}realisasi/${id}?status=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setAjukan(response.data.udah && response.data.belum);
  };

  const checkStatus2 = async () => {
    const response = await Axios.get(
      `${API_HOST.url}realisasi/${id}?status=2`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    setAccept(response.data.udah && response.data.belum);
  };

  const checkStatus3 = async () => {
    const response = await Axios.get(
      `${API_HOST.url}realisasi/${id}?status=3`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    setDenied(response.data.udah && response.data.belum);
  };

  useEffect(() => {
    checkStatus0();
    checkStatus1();
    checkStatus2();
    checkStatus3();
    Alert();
  }, []);

  const Alert = (e) => {
    if (typeof kosong !== 'undefined' && kosong.length > 0) {
      return (
        <View style={styles.notif}>
          <Text style={styles.text}>
            Maaf, Anda belum mengajukan RAB. Silahkan ajukan
          </Text>
        </View>
      );
    }
    if (typeof ajukan !== 'undefined' && ajukan.length > 0) {
      return (
        <View style={styles.notif}>
          <Text style={styles.text}>RAB Anda sedang dalam peninjauan</Text>
        </View>
      );
    }
    if (typeof accept !== 'undefined' && accept.length > 0) {
      return (
        <View style={styles.notif}>
          <Text style={styles.text}>
            RAB Anda disetujui. Silahkan realisasikan
          </Text>
        </View>
      );
    }
    if (typeof denied !== 'undefined' && denied.length > 0) {
      return (
        <View style={styles.notif}>
          <Text style={styles.text}>Maaf, RAB Anda ditolak.</Text>
        </View>
      );
    }
    return <View />;
  };

  return (
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.username}>Hi, {nama}</Text>
        </View>
      </View>
      {/* Carousel */}
      <View style={styles.carousel}>
        <LinearGradient
          start={{x: -1, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#FFD700', '#FED330']}
          style={styles.card1}>
          <Text style={styles.title}>Jumlah Guru</Text>
          <View style={styles.contentCard}>
            <Text style={styles.jumlah}>{jumlahGuru}</Text>
            <Text style={styles.subTitle}>Guru</Text>
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
      <View style={styles.container}>
        <Alert />
      </View>
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
    marginBottom: normalize(14),
  },
  amount: {
    fontFamily: 'Montserrat-Bold',
    fontSize: normalize(30),
    color: '#2E2E2E',
  },
  profile: {
    width: normalize(50),
    height: normalize(50),
  },
  carousel: {
    flexDirection: 'row',
    paddingHorizontal: normalize(20),
    marginBottom: normalize(40),
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
    fontSize: normalize(16),
    color: '#FFFFFF',
  },
  jumlah: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(20),
    color: '#FFFFFF',
  },
  subTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(9),
    color: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  notif: {
    height: '12%',
    backgroundColor: '#181818',
    marginHorizontal: normalize(20),
    marginBottom: normalize(20),
    borderRadius: normalize(10),
    paddingHorizontal: normalize(12),
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(12),
    color: '#FFFFFF',
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
    marginBottom: normalize(25),
  },
  lastReport: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(18),
    color: '#2E2E2E',
  },
  seeAll: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(14),
    color: '#45AAF2',
  },
  list: {
    flexDirection: 'row',
    paddingLeft: normalize(31),
    paddingRight: normalize(51),
    alignItems: 'center',
  },
  icon: {
    width: normalize(50),
    height: normalize(50),
    marginRight: normalize(20),
  },
  file: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(16),
    color: '#000000',
  },
  date: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(13),
    color: '#6D6D6D',
  },
});
