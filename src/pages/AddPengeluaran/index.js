import DateTimePicker from '@react-native-community/datetimepicker';
import Axios from 'axios';
import Moment from 'moment';
import 'moment/locale/id';
import React, {useEffect, useState} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import normalize from 'react-native-normalize';
import {IcCamera} from '../../assets';
import {Button, Gap, Header, Number, TextInput} from '../../components';
import {showMessage, useForm} from '../../utils';
import storage from '../../utils/storage';

const AddPengeluaran = ({navigation, route}) => {
  const [form, setForm] = useForm({
    nama: '',
    keterangan: '',
    date: new Date(),
    harga_ringgit: '',
    harga_rupiah: '',
    sisa_ringgit: '',
    sisa_rupiah: '',
    photo: '',
  });
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [NPSN, setNPSN] = useState('');

  const data = route.params;

  const rupiah = parseInt(form.harga_ringgit) * 3000;
  const sisa_ringgit = data.total_harga_ringgit - parseInt(form.harga_ringgit);
  const sisa_rupiah = data.total_harga_rupiah - rupiah;

  const API_HOST = {
    url: 'https://api.laporanclcsmp.com/api/v1/',
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || form.date;
    setForm('date', currentDate);
    setShow(false);
  };

  const openCamera = () => {
    launchCamera(
      {
        quality: 1,
        maxHeight: 2000,
        maxWidth: 2000,
      },
      (response) => {
        if (response.didCancel || response.error) {
          showMessage('Anda tidak memilih Photo', 'failed');
        } else {
          const source = {uri: response.uri};
          const dataImage = {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          };

          setForm('photo', dataImage);
          setPhoto(source);
        }
      },
    );
  };

  useEffect(() => {
    storage
      .load({
        key: 'profile',
      })
      .then((ret) => {
        setNPSN(ret.cabang.kode);
      })
      .catch((err) => {
        console.warn(err.message);
      });
  }, []);

  const onSubmit = () => {
    const day = new Date(form.date).getDate();
    const month = new Date(form.date).getMonth();
    const year = new Date(form.date).getFullYear();
    const date = year + '-' + month + '-' + day;

    storage
      .load({
        key: 'token',
      })
      .then((res) => {
        const dataForSubmit = new FormData();
        dataForSubmit.append('id_rab', data.id);
        dataForSubmit.append('id_cabang', data.id_cabang);
        dataForSubmit.append('nama', form.nama);
        dataForSubmit.append('keterangan', form.keterangan);
        dataForSubmit.append('harga_ringgit', parseInt(form.harga_ringgit));
        dataForSubmit.append('harga_rupiah', rupiah);
        dataForSubmit.append('gambar', form.photo);
        dataForSubmit.append('tanggal', date);
        dataForSubmit.append('sisa_ringgit', sisa_ringgit);
        dataForSubmit.append('sisa_rupiah', sisa_rupiah);

        Axios.post(`${API_HOST.url}belanjakan`, dataForSubmit, {
          headers: {
            Authorization: `Bearer ${res}`,
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((result) => {
            console.log(result);
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
        console.log(err.response);
      });
  };

  return (
    <View style={styles.page}>
      <Header title="Realisasikan" onBack onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.containerAnggaran}>
          <Text style={styles.labelAnggaran}>Dana Anggaran</Text>
          <View>
            <Number
              number={data.total_harga_ringgit}
              style={styles.anggaranAmount}
              prefix="RM. "
            />
            <Number
              number={data.total_harga_rupiah}
              style={styles.anggaranAmount}
              prefix="Rp. "
            />
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput placeholder="NPSN" value={NPSN} editable={false} />
          <TextInput placeholder="Kode" value={data.kode} editable={false} />
          <TextInput
            placeholder="Masukkan Nama Toko"
            value={form.nama}
            onChangeText={(value) => setForm('nama', value)}
          />
          <TextInput
            placeholder="Keterangan"
            value={form.keterangan}
            onChangeText={(value) => setForm('keterangan', value)}
          />
          <TouchableOpacity
            style={styles.calendar}
            onPress={() => setShow(true)}>
            <Text style={styles.date}>
              {Moment(form.date).format('DD/MM/YYYY')}
            </Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={form.date}
                mode="date"
                is24Hour
                display="default"
                onChange={onChange}
              />
            )}
          </TouchableOpacity>
          <TextInput
            placeholder="Total Harga Ringgit (RM)"
            value={form.harga_ringgit}
            onChangeText={(value) => setForm('harga_ringgit', value)}
          />
          <TextInput
            placeholder="Total Harga Rupiah (RP)"
            value={`${isNaN(rupiah) ? 0 : rupiah}`}
            onChangeText={(value) => setForm('harga_rupiah', value)}
          />
          {/* Pengeluaran - Total = Sisa */}
          <TextInput
            placeholder="Sisa Ringgit (RM)"
            value={`${isNaN(sisa_ringgit) ? 0 : sisa_ringgit}`}
            onChangeText={(value) => setForm('sisa_ringgit', value)}
          />
          <TextInput
            placeholder="Sisa Rupiah (RP)"
            value={`${isNaN(sisa_rupiah) ? 0 : sisa_rupiah}`}
            onChangeText={(value) => setForm('sisa_rupiah', value)}
          />
          {photo && (
            <Animated.View style={styles.photoContainer}>
              <Image source={photo} style={styles.photo} />
            </Animated.View>
          )}
          <Button
            color="#FED330"
            text="Ambil Foto"
            icon={<IcCamera />}
            onPress={openCamera}
          />

          <Gap height={40} />
          <Button text="Simpan" onPress={onSubmit} />
          <Gap height={20} />
        </ScrollView>
      </View>
    </View>
  );
};

export default AddPengeluaran;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: normalize(20),
  },
  form: {
    backgroundColor: '#FEF7DD',
    paddingVertical: normalize(16),
    borderRadius: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerAnggaran: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(10),
  },
  labelAnggaran: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(18),
    color: '#181818',
  },
  anggaranAmount: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(18),
    color: '#A3A3A3',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#A8A8A8',
    marginBottom: normalize(15),
  },
  picker: {
    color: '#6D6D6D',
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#A8A8A8',
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(16),
    marginBottom: normalize(15),
  },
  photoContainer: {
    marginVertical: normalize(20),
  },
  photo: {
    width: normalize(200),
    height: normalize(200),
    borderRadius: normalize(20),
  },
  date: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(16),
  },
  browseFile: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(15),
    color: '#EBBF1A',
  },
});
