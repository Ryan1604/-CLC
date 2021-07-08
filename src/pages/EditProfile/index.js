import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import normalize from 'react-native-normalize';
import {useDispatch} from 'react-redux';
import {Button, Gap, TextInput} from '../../components';
import {API_HOST} from '../../config/API';
import {updateProfile} from '../../redux/action/auth';
import {getData} from '../../utils/storage';

const EditProfile = ({navigation}) => {
  const [id, setId] = useState(null);
  const [NPSN, setNPSN] = useState('');
  const [nama, setNama] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [seven, setSeven] = useState('');
  const [eight, setEight] = useState('');
  const [nine, setNine] = useState('');
  const [bina, setBina] = useState('');
  const [pamong, setPamong] = useState('');

  const dispatch = useDispatch();

  const jumlahMurid = parseInt(seven) + parseInt(eight) + parseInt(nine);
  const jumlahGuru = parseInt(bina) + parseInt(pamong);

  const data = {
    nama: nama,
    no_telpon: phone,
    alamat: address,
    jumlah_kelas_7: seven,
    jumlah_kelas_8: eight,
    jumlah_kelas_9: nine,
    total_jumlah_siswa: jumlahMurid,
    jumlah_guru_bina: bina,
    jumlah_guru_pamong: pamong,
    total_jumlah_guru: jumlahGuru,
  };

  // Get Data Profile
  useEffect(() => {
    getData('profile').then((res) => {
      setId(res.cabang.id);
    });
  });

  // Get Data Cabang
  useEffect(() => {
    const source = Axios.CancelToken.source();
    const getDataRAB = async () => {
      try {
        const result = await Axios.get(`${API_HOST.url}cabang/${id}`, {
          cancelToken: source.token,
        });

        setNPSN(result.data.cabang.kode);
        setNama(result.data.cabang.nama);
        setPhone(result.data.cabang.no_telpon);
        setAddress(result.data.cabang.alamat);
        setSeven(result.data.cabang.jumlah_kelas_7.toString());
        setEight(result.data.cabang.jumlah_kelas_8.toString());
        setNine(result.data.cabang.jumlah_kelas_9.toString());
        setBina(result.data.cabang.jumlah_guru_bina.toString());
        setPamong(result.data.cabang.jumlah_guru_pamong.toString());
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
  }, [id]);

  const onSubmit = () => {
    dispatch(updateProfile(data, navigation));
  };

  return (
    <View style={styles.page}>
      <Gap height={40} />
      <ScrollView>
        <View style={styles.container}>
          <View>
            <View style={styles.input}>
              <Text style={styles.label}>NPSN</Text>
              <TextInput value={NPSN} disabled={false} />
            </View>
            <View style={styles.input}>
              <Text style={styles.label}>Nama</Text>
              <TextInput
                value={nama}
                onChangeText={(value) => setNama(value)}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.label}>No. Telepon</Text>
              <TextInput
                value={phone}
                onChangeText={(value) => setPhone(value)}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.label}>Alamat</Text>
              <TextInput
                value={address}
                onChangeText={(value) => setAddress(value)}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.label}>Jumlah Murid Kelas 7</Text>
              <TextInput
                value={seven}
                onChangeText={(value) => setSeven(value)}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.label}>Jumlah Murid Kelas 8</Text>
              <TextInput
                value={eight}
                onChangeText={(value) => setEight(value)}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.label}>Jumlah Murid Kelas 9</Text>
              <TextInput
                value={nine}
                onChangeText={(value) => setNine(value)}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.label}>Total Murid</Text>
              <TextInput value={`${jumlahMurid}`} disabled={false} />
            </View>
            <View style={styles.input}>
              <Text style={styles.label}>Jumlah Guru Bina</Text>
              <TextInput
                value={bina}
                onChangeText={(value) => setBina(value)}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.label}>Jumlah Guru Pamong</Text>
              <TextInput
                value={pamong}
                onChangeText={(value) => setPamong(value)}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.label}>Total Guru</Text>
              <TextInput value={`${jumlahGuru}`} disabled={false} />
            </View>
          </View>
          <Gap height={20} />
          <Button text="Edit" onPress={onSubmit} color="#181818" />
          <Gap height={20} />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    paddingVertical: normalize(48),
    paddingHorizontal: normalize(30),
  },
  borderPhoto: {
    borderWidth: 3,
    borderColor: '#F9D036',
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(100),
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(80),
  },
  container: {
    marginHorizontal: normalize(20),
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(14),
    color: '#6B6B6B',
  },
  input: {
    marginBottom: normalize(12),
  },
});
