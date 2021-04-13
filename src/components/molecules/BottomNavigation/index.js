import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  IcHome,
  IcHomeActive,
  IcPengeluaran,
  IcPengeluaranActive,
  IcProfile,
  IcProfileActive,
  IcRAB,
  IcRABActive,
} from '../../../assets';
import normalize from 'react-native-normalize';

const Icon = ({label, active}) => {
  switch (label) {
    case 'Home':
      return active ? <IcHomeActive /> : <IcHome />;
    case 'RAB':
      return active ? <IcRABActive /> : <IcRAB />;
    case 'Realisasi':
      return active ? <IcPengeluaranActive /> : <IcPengeluaran />;
    case 'Profile':
      return active ? <IcProfileActive /> : <IcProfile />;

    default:
      <IcHome />;
  }
  return <IcHome />;
};

const BottomNavigation = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.menu}>
            <Icon label={label} active={isFocused} />
            <Text style={styles.text(isFocused)}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: normalize(14),
    paddingHorizontal: normalize(46),
    justifyContent: 'space-between',
    elevation: 30,
  },
  menu: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: (active) => ({
    fontFamily: 'Montserrat-Bold',
    fontSize: normalize(12),
    color: active ? '#FED330' : '#8F8F8F',
    paddingTop: normalize(10),
  }),
});
