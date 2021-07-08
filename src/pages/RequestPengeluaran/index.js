import Axios from 'axios';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import normalize from 'react-native-normalize';
import {Button, Header, TextInput} from '../../components';
import {showMessage, useForm} from '../../utils';
import storage from '../../utils/storage';

const RequestPengeluaran = ({navigation, route}) => {
  const [form, setForm] = useForm({
    keterangan: '',
    sisa_ringgit: '',
    sisa_rupiah: '',
    kategori: 'NON RAB',
  });
  const [token, setToken] = useState('');
  const data = route.params;

  const rupiah = parseInt(form.sisa_ringgit) * 3000;

  const API_HOST = {
    url: 'https://api.laporanclcsmp.com/api/v1/',
  };

  const onSubmit = () => {
    storage
      .load({
        key: 'token',
      })
      .then((resToken) => {
        setToken(resToken);
      })
      .catch((err) => {
        console.warn(err.message);
      });
    storage
      .load({
        key: 'profile',
      })
      .then((res) => {
        const dataForSubmit = {
          id_realisasi: data.id_realisasi,
          sisa_ringgit: parseInt(form.sisa_ringgit),
          sisa_rupiah: rupiah,
          kategori: form.kategori,
          keterangan: form.keterangan,
        };

        Axios.post(`${API_HOST.url}pindah-dana`, dataForSubmit, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((result) => {
            showMessage(result.data.meta.message);
            setTimeout(() => {
              navigation.goBack();
            }, 1000);
          })
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.warn(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <Header
        title="Alihkan Sisa Dana"
        onBack
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <TextInput
              placeholder="Masukkan Tujuan Pengeluaran"
              value={form.keterangan}
              onChangeText={(value) => setForm('keterangan', value)}
            />
            <TextInput
              placeholder="Masukkan Nominal Ringgit"
              value={form.sisa_ringgit}
              onChangeText={(value) => setForm('sisa_ringgit', value)}
            />
            <TextInput
              placeholder="Masukkan Nominal Ringgit"
              value={`${isNaN(rupiah) ? 0 : rupiah}`}
              onChangeText={(value) => setForm('sisa_rupiah', value)}
            />
          </View>
        </ScrollView>
        <View style={styles.button}>
          <Button text="Simpan" onPress={onSubmit} />
        </View>
      </View>
    </View>
  );
};

export default RequestPengeluaran;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: normalize(20),
    marginBottom: normalize(20),
  },
  button: {
    marginHorizontal: normalize(20),
    marginBottom: normalize(67),
  },
});
