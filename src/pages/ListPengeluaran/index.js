/* eslint-disable react-hooks/exhaustive-deps */
import LottieView from 'lottie-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Gap, Header, ListRequest} from '../../components';

const ModalPopUp = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const ListPengeluaran = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [data] = useState(true);

  return (
    <View style={styles.page}>
      {data ? (
        <View style={styles.page}>
          <Header
            title="Daftar Dana Sisa"
            onBack
            onPress={() => navigation.goBack()}
          />
          <View style={styles.content}>
            <ScrollView>
              <ListRequest
                kode="3.2.1"
                name="Beli Buku"
                amount="100"
                status="Menunggu Persetujuan"
                onPress={() => setVisible(true)}
              />
            </ScrollView>
          </View>
        </View>
      ) : (
        <View style={styles.null}>
          <LottieView
            source={require('../../assets/Illustrations/NotFound.json')}
            autoPlay
            loop
            style={styles.illustration}
          />
        </View>
      )}

      {/* Modal Detail */}
      <ModalPopUp visible={visible}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <View style={styles.buttonClose}>
                <Text style={styles.textClose}>Close</Text>
              </View>
            </TouchableOpacity>
            <Gap height={30} />
            <View style={styles.containeModal}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.RAB}
                onPress={() => {
                  setVisible(false);
                  navigation.navigate('SisaRAB');
                }}>
                <Text style={styles.textModal}>RAB</Text>
              </TouchableOpacity>
              <Gap width={20} />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.nonRAB}
                onPress={() => {
                  setVisible(false);
                  navigation.navigate('RequestPengeluaran');
                }}>
                <Text style={styles.textModal}>Non RAB</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalPopUp>
    </View>
  );
};

export default ListPengeluaran;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    marginBottom: 100,
    marginHorizontal: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 2,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  container: {
    alignItems: 'center',
  },
  null: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: 350,
  },
  containeModal: {
    flexDirection: 'row',
  },
  RAB: {
    width: 120,
    backgroundColor: '#181818',
    paddingVertical: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nonRAB: {
    width: 120,
    backgroundColor: '#181818',
    paddingVertical: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textModal: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  buttonClose: {
    alignItems: 'flex-end',
  },
  textClose: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
});
