import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import normalize from 'react-native-normalize';
import {IcArrowRight} from '../../../assets';
import {Gap} from '../../atoms';

const ListRequest = ({name, status, onPress}) => {
  const data = [
    {
      name,
      status,
    },
  ];

  return (
    <FlatList
      data={data}
      renderItem={(item) => (
        <TouchableOpacity
          style={styles.list}
          activeOpacity={0.7}
          onPress={onPress}>
          <View style={styles.container}>
            <Text style={styles.file}>{item.item.name}</Text>
            <Gap height={2} />
            {item.item.status === 'Belum Dibelanjakan' ? (
              <View style={styles.borderBelum}>
                <Text style={styles.status}>{item.item.status}</Text>
              </View>
            ) : (
              <View style={styles.borderSudah}>
                <Text style={styles.status}>{item.item.status}</Text>
              </View>
            )}
          </View>
          <IcArrowRight />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
    />
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
    fontSize: normalize(14),
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
