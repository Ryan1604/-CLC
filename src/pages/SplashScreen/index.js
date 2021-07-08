import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import normalize from 'react-native-normalize';
import {Logo} from '../../assets';
import {getData} from '../../utils/storage';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      getData('firstTime').then((res) => {
        if (res) {
          getData('token').then((result) => {
            if (result) {
              navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
            } else {
              navigation.replace('Login');
            }
          });
        } else {
          navigation.replace('IntroSlider');
        }
      });
    }, 2000);
  }, [navigation]);
  return (
    <View style={styles.page}>
      <Image source={Logo} style={styles.logo} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FED330',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: normalize(155),
    height: normalize(147),
  },
});
