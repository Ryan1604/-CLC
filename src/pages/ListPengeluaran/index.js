import Axios from 'axios';
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
import normalize from 'react-native-normalize';
import {IcArrowRight} from '../../assets';
import {Gap, Header, Number} from '../../components';
import storage, {getData} from '../../utils/storage';
import {API_HOST} from '../../config/API';

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
  const [id, setId] = React.useState('');
  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);
  const [itemData, setItemData] = useState({});

  // Get Data Token
  useEffect(() => {
    getData('token').then((res) => {
      setToken(res);
    });
  }, []);

  // Get Data Profile
  useEffect(() => {
    getData('profile').then((res) => {
      setId(res.cabang.id);
    });
  }, []);

  // Get Data
  useEffect(() => {
    const source = Axios.CancelToken.source();
    const getDataRealisasi = async () => {
      try {
        const result = await Axios.get(`${API_HOST.url}realisasi/${id}/sisa`, {
          cancelToken: source.token,
        });
        console.log(result);
        setData(result.data.data);
      } catch (err) {
        if (Axios.isCancel(err)) {
        } else {
          throw err;
        }
      }
    };
    getDataRealisasi();

    return () => {
      source.cancel();
    };
  });

  const openModal = (item) => {
    setItemData(item);
    setVisible(true);
  };

  return (
    <View style={styles.page}>
      {data.length > 0 ? (
        <View style={styles.page}>
          <Header
            title="Daftar Dana Sisa"
            onBack
            onPress={() => navigation.goBack()}
          />
          <View style={styles.content}>
            <ScrollView>
              {data.map((item, index) => {
                if (item.status === 0) {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.list}
                      activeOpacity={0.7}
                      onPress={() => openModal(item)}>
                      <View style={styles.containerList}>
                        <Text style={styles.file}>{item.nama}</Text>
                        <View style={styles.borderProses}>
                          <Number
                            number={item.sisa_rupiah}
                            style={styles.status}
                            prefix="Rp. "
                          />
                        </View>
                      </View>
                      <IcArrowRight />
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <View key={index} style={styles.list}>
                      <View style={styles.containerList}>
                        <Text style={styles.file}>{item.nama}</Text>
                        <View style={styles.borderProses}>
                          <Text style={styles.status}>
                            Menunggu Persetujuan
                          </Text>
                        </View>
                      </View>
                      <IcArrowRight />
                    </View>
                  );
                }
              })}
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
                  navigation.navigate('SisaRAB', itemData);
                }}>
                <Text style={styles.textModal}>RAB</Text>
              </TouchableOpacity>
              <Gap width={20} />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.nonRAB}
                onPress={() => {
                  setVisible(false);
                  navigation.navigate('RequestPengeluaran', itemData);
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
    marginBottom: normalize(100),
    marginHorizontal: normalize(20),
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
    paddingHorizontal: normalize(2),
    paddingVertical: normalize(30),
    borderRadius: normalize(20),
    elevation: normalize(20),
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
    width: normalize(350),
  },
  containeModal: {
    flexDirection: 'row',
  },
  RAB: {
    width: normalize(120),
    backgroundColor: '#181818',
    paddingVertical: normalize(20),
    borderRadius: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nonRAB: {
    width: normalize(120),
    backgroundColor: '#181818',
    paddingVertical: normalize(20),
    borderRadius: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textModal: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(14),
    color: '#FFFFFF',
  },
  buttonClose: {
    alignItems: 'flex-end',
  },
  textClose: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(14),
  },
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
  containerList: {flex: 1},
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
  borderProses: {
    backgroundColor: '#FFE08A',
    paddingHorizontal: normalize(7),
    paddingVertical: normalize(4),
    borderRadius: normalize(5),
    width: normalize(150),
  },
});
