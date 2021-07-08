import CheckBox from '@react-native-community/checkbox';
import Axios from 'axios';
import 'moment/locale/id';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import normalize from 'react-native-normalize';
import {Button, Gap, Header, TextInput} from '../../components';
import {API_HOST} from '../../config/API';
import {getData} from '../../utils/storage';

const AddPengeluaran = ({navigation, route}) => {
  const {uraian, kode} = route.params.item;
  const [NPSN, setNPSN] = useState('');
  const [checkedId, setCheckId] = useState(-1);
  const [toggleCheckBox, setToggleCheckBox] = useState([]);
  const [search, setSearch] = React.useState();

  // Get Data Profile
  useEffect(() => {
    getData('profile').then((res) => {
      setNPSN(res.cabang.kode);
    });
  }, []);

  const onSearch = async () => {
    const source = Axios.CancelToken.source();
    try {
      const result = await Axios.get(
        `${API_HOST.url}cari-code?kode=${search}&cabang=4`,
        {
          cancelToken: source.token,
        },
      );
      setToggleCheckBox(result.data.rab);
    } catch (err) {
      if (Axios.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const handleCheck = (id) => {
    setCheckId({id});
    const data = toggleCheckBox;
    data[id].checked = !data[id].checked;
  };

  const getValueCheckBox = () => {
    var keys = toggleCheckBox.map((t) => t.id);
    var ringgit = toggleCheckBox.map((t) => t.total_harga_ringgit);
    var rupiah = toggleCheckBox.map((t) => t.total_harga_rupiah);
    var checks = toggleCheckBox.map((t) => t.checked);
    let Selected = [];
    for (let i = 0; i < checks.length; i++) {
      if (checks[i] === true) {
        Selected.push({id: keys[i], ringgit: ringgit[i], rupiah: rupiah[i]});
      }
    }
    navigation.navigate('AddPengeluaranDetail', Selected);
  };

  return (
    <View style={styles.page}>
      <Header title="Realisasikan" onBack onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput value={NPSN} editable={false} />
          <TextInput value={kode + '. ' + uraian} editable={false} />
          <View style={styles.searchContainer}>
            <View style={styles.left}>
              <TextInput
                value={search}
                placeholder="Cari Kode"
                onChangeText={(value) => setSearch(value)}
              />
            </View>
            <Gap width={20} />
            <View style={styles.right}>
              <Button text="Cari" onPress={onSearch} />
            </View>
          </View>
          {toggleCheckBox.map((item, index) => {
            return (
              <View style={styles.checkContainer} key={index}>
                <CheckBox
                  disabled={false}
                  value={item.checked}
                  onValueChange={() => handleCheck(index)}
                />
                <Text>{item.kode + ' ' + item.nama}</Text>
              </View>
            );
          })}
          <Gap height={40} />
          <Button text="Selanjutnya" onPress={() => getValueCheckBox()} />
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
  searchContainer: {
    flexDirection: 'row',
  },
  left: {
    flex: 4,
  },
  right: {
    flex: 2,
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelCheckbox: {
    fontFamily: 'OpenSans-Medium',
    fontSize: normalize(14),
    color: '#000000',
  },
});
