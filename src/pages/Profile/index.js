import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import normalize from 'react-native-normalize';
import {
  IcArrowLeft,
  IcArrowRight,
  IcDataPribadi,
  IcInformation,
} from '../../assets';
import {Gap} from '../../components';
import {getData} from '../../utils/storage';

const Profile = ({navigation}) => {
  const [nama, setNama] = useState('');
  const [npsn, setNpsn] = useState('');

  // Get Data Profile
  useEffect(() => {
    getData('profile').then((res) => {
      setNama(res.user_nama);
      setNpsn(res.cabang.kode);
    });
  });
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <View style={styles.back}>
            <IcArrowLeft />
          </View>
        </TouchableOpacity>
        <Gap width={30} />
        <View>
          <Text style={styles.title}>{nama}</Text>
          <Text style={styles.subTitle}>{npsn}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.listMenu}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('EditProfile')}>
        <IcDataPribadi />
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Profil CLC</Text>
        </View>
        <IcArrowRight />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listMenu}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Informasi')}>
        <IcInformation />
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Informasi Aplikasi</Text>
        </View>
        <IcArrowRight />
      </TouchableOpacity>
      <View style={styles.containerVersion}>
        <Text style={styles.version}>Versi 1.0.0</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(48),
    paddingHorizontal: normalize(30),
  },
  profile: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(40),
    marginRight: normalize(20),
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(20),
    color: '#2E2E2E',
  },
  subTitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(14),
    color: '#2E2E2E',
  },
  listMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: normalize(51),
    marginRight: normalize(43),
    marginBottom: normalize(30),
  },
  listContainer: {
    flex: 1,
    marginLeft: normalize(22),
  },
  listTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(17),
    color: '#000000',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#181818',
    marginHorizontal: normalize(45),
    marginVertical: normalize(12),
    paddingVertical: normalize(11),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(30),
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(14),
    color: '#FFFFFF',
    marginLeft: normalize(13),
  },
  containerVersion: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  version: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(14),
    color: '#6D6D6D',
    textAlign: 'center',
    marginBottom: normalize(38),
  },
});
