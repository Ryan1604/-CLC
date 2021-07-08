import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import normalize from 'react-native-normalize';
import {useDispatch} from 'react-redux';
import {Button, Gap, Header, Number} from '../../components';
import {API_HOST} from '../../config/API';
import {submitAction} from '../../redux/action/rab';
import {getData} from '../../utils/storage';

const Preview = ({route, navigation}) => {
  const status = route.params;
  const [token, setToken] = useState('');
  const [NPSN, setNPSN] = useState(null);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);

  // Get Token
  useEffect(() => {
    getData('token').then((res) => {
      setToken(res);
    });
  });

  // Get Data Profile
  useEffect(() => {
    getData('profile').then((res) => {
      setId(res.cabang.id);
      setNPSN(res.cabang.kode);
    });
  });

  // Get Data RAB
  useEffect(() => {
    const source = Axios.CancelToken.source();
    const getDataRAB = async () => {
      try {
        const result = await Axios.get(`${API_HOST.url}rab/npsn/${NPSN}`, {
          cancelToken: source.token,
        });
        setData(result.data.data);
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
  });

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(submitAction(id, navigation));
  };

  return (
    <View style={styles.page}>
      <Header title="Preview RAB" />
      <ScrollView>
        <Gap height={20} />
        <View style={styles.container}>
          {data.map((item) => {
            return (
              <View style={styles.card} key={item.id}>
                <View style={styles.content}>
                  <Text style={styles.label}>Kode</Text>
                  <Text style={styles.value}>{item.kode}</Text>
                </View>
                <View style={styles.content}>
                  <Text style={styles.label}>Nama Uraian</Text>
                  <Text style={styles.value}>{item.nama}</Text>
                </View>
                <View style={styles.content}>
                  <Text style={styles.label}>Harga Ringgit (RM)</Text>
                  <Number
                    number={item.harga_ringgit}
                    style={styles.value}
                    prefix="RM "
                  />
                </View>
                <View style={styles.content}>
                  <Text style={styles.label}>Harga Rupiah (Rp)</Text>
                  <Number
                    number={item.harga_rupiah}
                    style={styles.value}
                    prefix="Rp. "
                  />
                </View>
                <View style={styles.content}>
                  <Text style={styles.label}>Jumlah dan Satuan 1</Text>
                  <Text style={styles.value}>
                    {item.jumlah_1} {item.satuan_1}
                  </Text>
                </View>
                <View style={styles.content}>
                  <Text style={styles.label}>Jumlah dan Satuan 2</Text>
                  <Text style={styles.value}>
                    {item.jumlah_2} {item.satuan_2}
                  </Text>
                </View>
                <View style={styles.content}>
                  <Text style={styles.label}>Jumlah dan Satuan 3</Text>
                  <Text style={styles.value}>
                    {item.jumlah_3} {item.satuan_3}
                  </Text>
                </View>
                <View style={styles.content}>
                  <Text style={styles.label}>Jumlah dan Satuan 4</Text>
                  <Text style={styles.value}>
                    {item.jumlah_4} {item.satuan_4}
                  </Text>
                </View>
                <View style={styles.content}>
                  <Text style={styles.label}>Total Ringgit (RM)</Text>
                  <Number
                    number={item.total_harga_ringgit}
                    style={styles.value}
                    prefix="RM "
                  />
                </View>
                <View style={styles.content}>
                  <Text style={styles.label}>Total Rupiah (Rp)</Text>
                  <Number
                    number={item.total_harga_rupiah}
                    style={styles.value}
                    prefix="Rp. "
                  />
                </View>
              </View>
            );
          })}
          {status === '0' && (
            <View style={styles.button}>
              <Button text="Ajukan" color="#181818" onPress={onSubmit} />
            </View>
          )}
        </View>
        <Gap height={20} />
      </ScrollView>
    </View>
  );
};

export default Preview;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    elevation: 2,
    borderRadius: normalize(10),
    padding: normalize(15),
    marginBottom: normalize(15),
    backgroundColor: '#FFFFFF',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: normalize(5),
  },

  label: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(12),
    color: '#000',
  },
  value: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(12),
    color: '#3D3D3D',
  },
  button: {
    width: '90%',
  },
});
