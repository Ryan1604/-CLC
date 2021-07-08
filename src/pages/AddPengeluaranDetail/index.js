import DateTimePicker from '@react-native-community/datetimepicker';
import Axios from 'axios';
import Moment from 'moment';
import 'moment/locale/id';
import React, {useState} from 'react';
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
import {API_HOST} from '../../config/API';
import {showMessage, useForm} from '../../utils';
import {getData} from '../../utils/storage';

const AddPengeluaranDetail = ({navigation, route}) => {
  const data = route.params;
  const [kurs, setKurs] = useState(0);
  const [anggaranRinggit, setAnggaranRinggit] = useState(0);
  const [anggaranRupiah, setAnggaranRupiah] = useState(0);
  const [idRAB, setIdRAB] = useState([]);
  const [idCabang, setIdCabang] = useState(0);

  const [form, setForm] = useForm({
    nama: '',
    keterangan: '',
    date: new Date(),
    harga_ringgit: '',
    harga_rupiah: '',
    photo: '',
  });
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = useState(null);

  // Get Kurs
  React.useEffect(() => {
    const source = Axios.CancelToken.source();
    const getKurs = async () => {
      try {
        const result = await Axios.get(`${API_HOST.url}kurs`, {
          cancelToken: source.token,
        });

        setKurs(result.data.rupiah);
      } catch (err) {
        if (Axios.isCancel(err)) {
        } else {
          throw err;
        }
      }
    };
    getKurs();

    return () => {
      source.cancel();
    };
  });

  // Get Cabang
  React.useEffect(() => {
    getData('profile').then((res) => {
      setIdCabang(res.cabang.id);
    });
  });

  // ID RAB
  React.useEffect(() => {
    let id = [];
    for (let i = 0; i < data.length; i++) {
      id.push(data[i].id);
    }
    setIdRAB(id);
  }, [data]);

  // Total Dana Anggaran
  React.useEffect(() => {
    var total = 0;
    var totalRupiah = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i].ringgit;
      totalRupiah += data[i].rupiah;
    }
    setAnggaranRinggit(total);
    setAnggaranRupiah(totalRupiah);
  }, [data]);

  const rupiah = parseInt(form.harga_ringgit) * kurs;
  const sisa_ringgit = anggaranRinggit - parseInt(form.harga_ringgit);
  const sisa_rupiah = anggaranRupiah - rupiah;

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

  const onSubmit = () => {
    const day = new Date(form.date).getDate();
    const month = new Date(form.date).getMonth();
    const year = new Date(form.date).getFullYear();
    const date = year + '-' + month + '-' + day;

    const dataForSubmit = new FormData();
    dataForSubmit.append('id_rab', idRAB.toString());
    dataForSubmit.append('id_cabang', idCabang);
    dataForSubmit.append('nama', form.nama);
    dataForSubmit.append('keterangan', form.keterangan);
    dataForSubmit.append('harga_ringgit', parseInt(form.harga_ringgit));
    dataForSubmit.append('harga_rupiah', rupiah);
    dataForSubmit.append('gambar', form.photo);
    dataForSubmit.append('tanggal', date);
    dataForSubmit.append('sisa_ringgit', sisa_ringgit);
    dataForSubmit.append('sisa_rupiah', sisa_rupiah);

    Axios.post(`${API_HOST.url}belanjakan-banyak`, dataForSubmit, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((result) => {
        showMessage(result.data.meta.message);
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
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
              number={anggaranRinggit}
              style={styles.anggaranAmount}
              prefix="RM. "
            />
            <Number
              number={anggaranRupiah}
              style={styles.anggaranAmount}
              prefix="Rp. "
            />
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            placeholder="Nama Toko / Individu / Kegiatan"
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
            disabled={false}
          />
          <TextInput
            placeholder="Sisa Rupiah (RP)"
            value={`${isNaN(sisa_rupiah) ? 0 : sisa_rupiah}`}
            disabled={false}
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

export default AddPengeluaranDetail;

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
