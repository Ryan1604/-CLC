import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcArrowRight, ILApproved, ILRejected, ILWaiting} from '../../../assets';
import {Gap} from '../../atoms';
import normalize from 'react-native-normalize';

const ListRequest = ({kode, name, status, type, onPress, amount}) => {
  const Icon = () => {
    switch (status) {
      case 'Menunggu Persetujuan':
        return <Image source={ILWaiting} style={styles.icon} />;
      case 'Disetujui':
        return <Image source={ILApproved} style={styles.icon} />;
      case 'Ditolak':
        return <Image source={ILRejected} style={styles.icon} />;
      default:
        return <Image source={ILWaiting} style={styles.icon} />;
    }
  };
  return (
    <View>
      {type === 'Check' ? (
        <TouchableOpacity
          style={styles.list}
          activeOpacity={0.7}
          onPress={onPress}>
          <View style={styles.container}>
            <Text style={styles.file}>
              {kode} - {name}
            </Text>
            <Gap height={2} />
            {status === 'Belum Dibelanjakan' ? (
              <View style={styles.borderBelum}>
                <Text style={styles.status}>{status}</Text>
              </View>
            ) : (
              <View style={styles.borderSudah}>
                <Text style={styles.status}>{status}</Text>
              </View>
            )}
          </View>
          <IcArrowRight />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.list}
          activeOpacity={0.7}
          onPress={onPress}>
          {type === 'Check' ? <View /> : <Icon />}
          <View style={styles.container}>
            <Text style={styles.file}>{name}</Text>
            {amount > 0 ? (
              <View style={styles.borderProses}>
                <Text style={styles.status}>{amount}</Text>
              </View>
            ) : (
              <View style={styles.borderProses}>
                <Text style={styles.status}>{status}</Text>
              </View>
            )}
          </View>
          <IcArrowRight />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListRequest;

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#C4C4C4',
    marginHorizontal: normalize(35),
    paddingVertical: normalize(20),
    paddingLeft: normalize(14),
    paddingRight: normalize(20),
  },
  container: {
    flex: 1,
  },
  icon: {
    width: normalize(50),
    height: normalize(50),
    marginRight: normalize(20),
  },
  file: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(16),
    color: '#2E2E2E',
  },
  status: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(10),
    color: '#2E2E2E',
  },
  border: (status) => ({
    backgroundColor: status === 'Ditolak' ? '#FFADAD' : '#8AFF96',
    paddingHorizontal: normalize(7),
    paddingVertical: normalize(4),
    borderRadius: normalize(5),
    width: normalize(100),
  }),
  borderProses: {
    backgroundColor: '#FFE08A',
    paddingHorizontal: normalize(7),
    paddingVertical: normalize(4),
    borderRadius: normalize(5),
    width: normalize(150),
  },
  borderBelum: {
    backgroundColor: '#FFE08A',
    paddingHorizontal: normalize(7),
    paddingVertical: normalize(4),
    borderRadius: normalize(5),
    width: normalize(150),
  },
  borderSudah: {
    backgroundColor: '#8AFF96',
    paddingHorizontal: normalize(7),
    paddingVertical: normalize(4),
    borderRadius: normalize(5),
    width: normalize(150),
  },
});
