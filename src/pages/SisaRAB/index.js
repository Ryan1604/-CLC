import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import normalize from 'react-native-normalize';
import {Button, Header, TextInput} from '../../components';
import {showMessage, useForm} from '../../utils';
import storage from '../../utils/storage';

const SisaRAB = ({navigation, route}) => {
  const [token, setToken] = useState('');
  const [NPSN, setNPSN] = useState('');
  const [activitas, setActivitas] = useState([]);
  const [activitas1, setActivitas1] = useState([]);
  const [activitas2, setActivitas2] = useState([]);
  const [activitas3, setActivitas3] = useState([]);
  const [activitas4, setActivitas4] = useState([]);
  const [selectedActivitas, setSelectedActivitas] = useState('');
  const [selectedActivitas1, setSelectedActivitas1] = useState('');
  const [selectedActivitas2, setSelectedActivitas2] = useState('');
  const [selectedActivitas3, setSelectedActivitas3] = useState('');
  const [selectedActivitas4, setSelectedActivitas4] = useState('');
  const [ringgit, setRinggit] = useState('');

  const [form, setForm] = useForm({
    ringgit: '',
    total_rupiah: '',
    tambahan_biaya_ringgit: '',
    tambahan_biaya_rupiah: '',
    keterangan: '',
  });

  const data = route.params;

  const rupiah = parseInt(form.tambahan_biaya_ringgit) * 3000;

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
  };

  const getData3 = async (e) => {
    const response = await Axios.get(`${API_HOST.url}/aktifitas3/${e}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setActivitas3(response.data.aktifitas);
  };

  const getData4 = async (e) => {
    const response = await Axios.get(`${API_HOST.url}/aktifitas4/${e}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setActivitas4(response.data.aktifitas);
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
    storage
      .load({
        key: 'profile',
      })
      .then((res) => {
        const dataForSubmit = {
          id_realisasi: data.id_realisasi,
          sisa_ringgit: parseInt(ringgit),
          sisa_rupiah: parseInt(form.total_rupiah),
          kategori: 'RAB',
          id_rab: data.id_rab,
          jumlah_ringgit: parseInt(form.tambahan_biaya_ringgit),
          jumlah_rupiah: rupiah,
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
                  const x = setForm(
                    'total_rupiah',
                    item.harga_rupiah.toString(),
                  );
                  setRinggit(item.harga_ringgit.toString());
                  if (x) {
                    getData3(item.value);
                  }
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
                  const x = setForm(
                    'total_rupiah',
                    item.harga_rupiah.toString(),
                  );
                  setRinggit(item.harga_ringgit.toString());
                  if (x) {
                    getData4(item.value);
                  }
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
                setForm('total_rupiah', item.harga_rupiah.toString());
                setRinggit(item.harga_ringgit.toString());
              }}
            />
            <View>
              <Text style={styles.labelInput}>Total Ringgit</Text>
              <TextInput
                placeholder="Total Ringgit (RM)"
                value={ringgit}
                onChangeText={(value) => setRinggit(value)}
                disabled={false}
              />
            </View>
            <View>
              <Text style={styles.labelInput}>Total Rupiah</Text>
              <TextInput
                placeholder="Total Rupiah (RP)"
                value={form.total_rupiah}
                onChangeText={(value) => setForm('total_rupiah', value)}
                disabled={false}
              />
            </View>
            <View>
              <Text style={styles.labelInput}>Tambahan Biaya (RM)</Text>
              <TextInput
                placeholder="Tambahan Biaya (RM)"
                value={form.tambahan_biaya_ringgit}
                onChangeText={(value) =>
                  setForm('tambahan_biaya_ringgit', value)
                }
              />
            </View>
            <View>
              <Text style={styles.labelInput}>Tambahan Biaya (RP)</Text>
              <TextInput
                placeholder="Tambahan Biaya (RP)"
                value={`${isNaN(rupiah) ? 0 : rupiah}`}
                onChangeText={(value) =>
                  setForm('tambahan_biaya_rupiah', value)
                }
                disabled={false}
              />
            </View>
            <View>
              <Text style={styles.labelInput}>Keterangan</Text>
              <TextInput
                placeholder="Keterangan"
                value={form.keterangan}
                onChangeText={(value) => setForm('keterangan', value)}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.button}>
          <Button text="Simpan" onPress={onSubmit} />
        </View>
      </View>
    </View>
  );
};

export default SisaRAB;

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
  labelInput: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(14),
    color: '#595959',
    paddingHorizontal: normalize(14),
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
