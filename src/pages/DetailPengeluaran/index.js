import 'moment/locale/id';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import normalize from 'react-native-normalize';
import {Gap, Header, Number} from '../../components';

const DetailPengeluaran = ({navigation, route}) => {
  const {realisasi} = route.params;

  const date = new Date(realisasi.tanggal).toLocaleDateString();
  const images = `http://api.laporanclcsmp.com/upload/${realisasi.gambar}`;

  return (
    <View style={styles.page}>
      <Header title="Realisasikan" onBack onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <Text style={styles.label}>NPSN</Text>
        <Text style={styles.value}>A</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Nama Toko</Text>
        <Text style={styles.value}>{realisasi.nama}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Keterangan</Text>
        <Text style={styles.value}>{realisasi.keterangan}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Harga Ringgit (RM)</Text>
        <Number
          number={realisasi.harga_ringgit}
          style={styles.value}
          prefix="RM. "
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Harga Rupiah (RP)</Text>
        <Number
          number={realisasi.harga_rupiah}
          style={styles.value}
          prefix="Rp. "
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Tanggal</Text>
        <Text style={styles.value}>{date}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Sisa Ringgit (RM)</Text>
        <Number
          number={realisasi.sisa_ringgit}
          style={styles.value}
          prefix="RM. "
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Sisa Rupiah (RP)</Text>
        <Number
          number={realisasi.sisa_rupiah}
          style={styles.value}
          prefix="Rp. "
        />
      </View>
      <View style={styles.containerImage}>
        <Text style={styles.label}>Gambar</Text>
        <Gap height={10} />
        <Image source={{uri: images}} style={styles.image} />
      </View>
    </View>
  );
};

export default DetailPengeluaran;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: normalize(42),
    padding: normalize(10),
  },
  containerImage: {
    marginHorizontal: normalize(42),
    padding: normalize(10),
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#181818',
  },
  value: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#7A7A7A',
  },
  image: {
    width: normalize(300),
    height: normalize(200),
    borderRadius: normalize(5),
  },
});
