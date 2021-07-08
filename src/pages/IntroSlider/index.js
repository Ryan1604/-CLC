import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import storage, {storeData} from '../../utils/storage';
import normalize from 'react-native-normalize';

const IntroSlider = ({navigation}) => {
  const [showRealApp] = useState(false);
  const slides = [
    {
      key: 'one',
      title: 'Volutpat amet fringilla \n elementum  id.',
      desc:
        'Lorem ipsum dolor sit amet, \n consectetur adipiscing elit. Iaculis \n amet.',
      image: require('../../assets/Illustrations/Slider1.png'),
    },
    {
      key: 'two',
      title: 'Volutpat amet fringilla \n elementum  id.',
      desc:
        'Lorem ipsum dolor sit amet, \n consectetur adipiscing elit. Iaculis \n amet.',
      image: require('../../assets/Illustrations/Slider2.png'),
    },
    {
      key: 'three',
      title: 'Volutpat amet fringilla \n elementum  id.',
      desc:
        'Lorem ipsum dolor sit amet, \n consectetur adipiscing elit. Iaculis \n amet.',
      image: require('../../assets/Illustrations/Slider3.png'),
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
    );
  };

  const renderSkipButton = () => {
    return <Text style={styles.skip}>Skip</Text>;
  };
  const renderNextButton = () => {
    return <Text style={styles.next}>Next</Text>;
  };
  const renderDoneButton = () => {
    return (
      <View style={styles.doneButton}>
        <Text style={styles.done}>Lanjut</Text>
      </View>
    );
  };

  const onDone = () => {
    storeData('firstTime', 'No');
    navigation.reset({index: 0, routes: [{name: 'Login'}]});
  };

  if (showRealApp === false) {
    return (
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        showSkipButton
        showNextButton
        activeDotStyle={styles.activeDotStyle}
        dotStyle={styles.dotStyle}
        renderSkipButton={renderSkipButton}
        renderNextButton={renderNextButton}
        renderDoneButton={renderDoneButton}
        onDone={onDone}
      />
    );
  }
};

export default IntroSlider;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: normalize(277),
    height: normalize(234),
    marginTop: normalize(-30),
    marginBottom: normalize(68),
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(22),
    color: '#2E2E2E',
    textAlign: 'center',
    marginBottom: normalize(23),
  },
  desc: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(16),
    color: '#2E2E2E',
    textAlign: 'center',
  },
  dotStyle: {
    backgroundColor: 'rgba(0, 0, 0, .2)',
    marginBottom: normalize(142),
  },
  activeDotStyle: {
    backgroundColor: '#FED330',
    width: normalize(25),
    marginBottom: normalize(142),
  },
  skip: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(17),
    color: '#000000',
    paddingLeft: normalize(35),
  },
  next: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(17),
    color: '#000000',
    paddingRight: normalize(35),
  },
  doneButton: {
    backgroundColor: '#FED330',
    borderRadius: normalize(10),
    paddingVertical: normalize(17),
    paddingHorizontal: normalize(150),
    marginTop: normalize(-20),
    elevation: 1,
  },
  done: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(14),
    color: '#FFFFFF',
  },
});
