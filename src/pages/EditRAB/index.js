import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import normalize from 'react-native-normalize';
import {Button, Header, TextInput} from '../../components';
import {showMessage, useForm} from '../../utils';
import storage from '../../utils/storage';

const EditRAB = ({navigation, route}) => {
  const data = route.params;

  const [token, setToken] = useState('');
  const [NPSN, setNPSN] = useState('');
  const [activitas, setActivitas] = useState([]);
  const [activitas1, setActivitas1] = useState([]);
  const [activitas2, setActivitas2] = useState([]);
  const [activitas3, setActivitas3] = useState([]);
  const [activitas4, setActivitas4] = useState([]);
  const [selectedActivitas, setSelectedActivitas] = useState('');
  const [selectedActivitas1, setSelectedActivitas1] = useState(
    data.id_aktifitas,
  );
  const [selectedActivitas2, setSelectedActivitas2] = useState(data.kode_isi_1);
  const [selectedActivitas3, setSelectedActivitas3] = useState(data.kode_isi_2);
  const [selectedActivitas4, setSelectedActivitas4] = useState(data.kode_isi_3);

  const [form, setForm] = useForm({
    kode: data.kode,
    uraian: data.nama,
    jumlah_1: data.jumlah_1.toString(),
    jumlah_2: data.jumlah_2.toString(),
    jumlah_3: data.jumlah_3.toString(),
    jumlah_4: data.jumlah_4.toString(),
    satuan_1: data.satuan_1,
    satuan_2: data.satuan_2,
    satuan_3: data.satuan_3,
    satuan_4: data.satuan_4,
    harga_ringgit: data.harga_ringgit.toString(),
    harga_rupiah: data.harga_rupiah.toString(),
    total_harga_ringgit: data.total_harga_ringgit.toString(),
    total_harga_rupiah: data.total_harga_rupiah.toString(),
    prioritas: data.prioritas.toString(),
  });

  const [ringgit, setRinggit] = useState(data.harga_ringgit.toString());
  const rupiah = parseInt(ringgit) * 3000;

  const total_ringgit =
    parseInt(ringgit) *
    parseInt(form.jumlah_1) *
    parseInt(form.jumlah_2) *
    parseInt(form.jumlah_3) *
    parseInt(form.jumlah_4);

  const total_rupiah = parseInt(total_ringgit) * 3000;

  const API_HOST = {
    url: 'https://api.laporanclcsmp.com/api/v1/',
  };

  const getData = async (auth) => {
    const response = await Axios.get(`${API_HOST.url}/aktifitas`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });

    setActivitas(response.data.aktifitas);
  };

  const getData1 = async (e) => {
    const response = await Axios.get(`${API_HOST.url}/aktifitas/${e}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setActivitas1(response.data.aktifitas);
  };

  const getData2 = async (e) => {
    const response = await Axios.get(`${API_HOST.url}/aktifitas2/${e}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setActivitas2(response.data.aktifitas);
    setForm('kode', response.data.code);
  };

  const getData3 = async (e) => {
    const response = await Axios.get(`${API_HOST.url}/aktifitas3/${e}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setActivitas3(response.data.aktifitas);
    setForm('kode', response.data.code);
  };

  const getData4 = async (e) => {
    const response = await Axios.get(`${API_HOST.url}/aktifitas4/${e}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setActivitas4(response.data.aktifitas);
    setForm('kode', response.data.code);
  };

  const getCode = async (e) => {
    const response = await Axios.get(`${API_HOST.url}/code/${e}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setForm('kode', response.data.code);
  };

  useEffect(() => {
    storage
      .load({
        key: 'token',
      })
      .then((resToken) => {
        setToken(resToken);
        getData(resToken);
      })
      .catch((err) => {
        console.warn(err.message);
      });
    storage
      .load({
        key: 'profile',
      })
      .then((result) => {
        setNPSN(result.cabang.kode);
      })
      .catch((err) => {
        console.warn(err.message);
      });
  }, []);

  const onSubmit = () => {
    const dataForUpdate = {
      id_cabang: data.id_cabang,
      id_aktifitas: data.id_aktifitas,
      kode_isi_1: parseInt(selectedActivitas2),
      kode_isi_2: parseInt(selectedActivitas3),
      kode_isi_3: parseInt(selectedActivitas4),
      kode: form.kode,
      nama: form.uraian,
      jumlah_1: parseInt(form.jumlah_1),
      jumlah_2: parseInt(form.jumlah_2),
      jumlah_3: parseInt(form.jumlah_3),
      jumlah_4: parseInt(form.jumlah_4),
      satuan_1: form.satuan_1,
      satuan_2: form.satuan_2,
      satuan_3: form.satuan_3,
      satuan_4: form.satuan_4,
      harga_ringgit: parseInt(ringgit),
      harga_rupiah: rupiah,
      total_harga_rupiah: total_rupiah,
      total_harga_ringgit: total_ringgit,
      prioritas: parseInt(form.prioritas),
    };

    console.log(dataForUpdate);

    Axios.put(`${API_HOST.url}rab/${data.id}`, dataForUpdate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        showMessage(result.data.meta.message);
        setTimeout(() => {
          navigation.navigate('MainApp');
        }, 1000);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <View style={styles.page}>
      <Header title="Edit RAB" onBack onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <TextInput
              value={NPSN}
              onChangeText={(value) => setForm('kode', value)}
              disabled={false}
            />
            <DropDownPicker
              items={activitas}
              defaultValue={selectedActivitas}
              style={styles.picker}
              itemStyle={styles.itemStyle}
              selectedLabelStyle={styles.labelActive}
              placeholderStyle={styles.placeholder}
              placeholder="Pilih Uraian"
              onChangeItem={(item) => {
                setSelectedActivitas(item.value);
                if (item.value) {
                  getData1(item.value);
                }
              }}
            />
            <DropDownPicker
              items={activitas1}
              defaultValue={selectedActivitas1}
              style={styles.picker}
              itemStyle={styles.itemStyle}
              selectedLabelStyle={styles.labelActive}
              placeholderStyle={styles.placeholder}
              placeholder="Pilih Uraian"
              onChangeItem={(item) => {
                setSelectedActivitas1(item.value);
                if (item.value) {
                  getData2(item.value);
                }
              }}
            />
            <DropDownPicker
              items={activitas2}
              defaultValue={selectedActivitas2}
              style={styles.picker}
              itemStyle={styles.itemStyle}
              selectedLabelStyle={styles.labelActive}
              placeholderStyle={styles.placeholder}
              placeholder="Pilih Uraian"
              onChangeItem={(item) => {
                setSelectedActivitas2(item.value);
                if (item.value) {
                  getData3(item.value);
                }
              }}
            />
            <DropDownPicker
              items={activitas3}
              defaultValue={selectedActivitas3}
              style={styles.picker}
              itemStyle={styles.itemStyle}
              selectedLabelStyle={styles.labelActive}
              placeholderStyle={styles.placeholder}
              placeholder="Pilih Uraian"
              onChangeItem={(item) => {
                setSelectedActivitas3(item.value);
                if (item.value) {
                  getData4(item.value);
                }
              }}
            />
            <DropDownPicker
              items={activitas4}
              defaultValue={selectedActivitas4}
              style={styles.picker}
              itemStyle={styles.itemStyle}
              selectedLabelStyle={styles.labelActive}
              placeholderStyle={styles.placeholder}
              placeholder="Pilih Uraian"
              onChangeItem={(item) => {
                setSelectedActivitas4(item.value);
                if (item.value) {
                  getCode(item.value);
                }
              }}
            />
            <TextInput
              placeholder="Kode"
              value={form.kode}
              onChangeText={(value) => setForm('kode', value)}
              disabled={false}
            />
            <TextInput
              placeholder="Uraian"
              value={form.uraian}
              onChangeText={(value) => setForm('uraian', value)}
            />
            <TextInput
              placeholder="Harga Ringgit (RM)"
              value={ringgit}
              onChangeText={(value) => setRinggit(value)}
            />
            <TextInput
              placeholder="Harga Rupiah (RP)"
              value={`${isNaN(rupiah) ? 0 : rupiah}`}
              onChangeText={(value) => setForm('harga_rupiah', value)}
            />
            <View style={styles.smallForm}>
              <View style={styles.left}>
                <TextInput
                  placeholder="Jumlah"
                  value={form.jumlah_1}
                  onChangeText={(value) => setForm('jumlah_1', value)}
                />
              </View>
              <View style={styles.right}>
                <TextInput
                  placeholder="Satuan"
                  value={form.satuan_1}
                  onChangeText={(value) => setForm('satuan_1', value)}
                />
              </View>
            </View>
            <View style={styles.smallForm}>
              <View style={styles.left}>
                <TextInput
                  placeholder="Jumlah"
                  value={form.jumlah_2}
                  onChangeText={(value) => setForm('jumlah_2', value)}
                />
              </View>
              <View style={styles.right}>
                <TextInput
                  placeholder="Satuan"
                  value={form.satuan_2}
                  onChangeText={(value) => setForm('satuan_2', value)}
                />
              </View>
            </View>
            <View style={styles.smallForm}>
              <View style={styles.left}>
                <TextInput
                  placeholder="Jumlah"
                  value={form.jumlah_3}
                  onChangeText={(value) => setForm('jumlah_3', value)}
                />
              </View>
              <View style={styles.right}>
                <TextInput
                  placeholder="Satuan"
                  value={form.satuan_3}
                  onChangeText={(value) => setForm('satuan_3', value)}
                />
              </View>
            </View>
            <View style={styles.smallForm}>
              <View style={styles.left}>
                <TextInput
                  placeholder="Jumlah"
                  value={form.jumlah_4}
                  onChangeText={(value) => setForm('jumlah_4', value)}
                />
              </View>
              <View style={styles.right}>
                <TextInput
                  placeholder="Satuan"
                  value={form.satuan_4}
                  onChangeText={(value) => setForm('satuan_4', value)}
                />
              </View>
            </View>
            <TextInput
              value={`${isNaN(total_ringgit) ? 0 : total_ringgit}`}
              onChangeText={(value) => setForm('total_harga_ringgit', value)}
              disabled={false}
            />
            <TextInput
              value={`${isNaN(total_rupiah) ? 0 : total_rupiah} `}
              onChangeText={(value) => setForm('total_harga_rupiah', value)}
              disabled={false}
            />
            <TextInput
              placeholder="Prioritas"
              value={form.prioritas}
              onChangeText={(value) => setForm('prioritas', value)}
            />
          </View>
        </ScrollView>
        <View style={styles.button}>
          <Button text="Ubah" onPress={onSubmit} />
        </View>
      </View>
    </View>
  );
};

export default EditRAB;

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
  label: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(12),
    color: '#595959',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#A8A8A8',
    marginBottom: normalize(15),
  },
  picker: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#A8A8A8',
    marginBottom: normalize(15),
  },
  itemStyle: {
    justifyContent: 'flex-start',
  },
  placeholder: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#6D6D6D',
  },
  labelActive: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#020202',
  },
  smallForm: {
    flexDirection: 'row',
  },
  left: {
    flex: 1,
    marginRight: normalize(10),
  },
  right: {
    flex: 1,
  },
  button: {
    marginHorizontal: normalize(20),
    marginBottom: normalize(67),
  },
});
