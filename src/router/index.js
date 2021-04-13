import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {BottomNavigation} from '../components';
import {
  AddPengeluaran,
  AddRAB,
  CheckSisaPengeluaran,
  EditProfile,
  Home,
  ImportRAB,
  IntroSlider,
  ListPengeluaran,
  Login,
  Pengeluaran,
  Profile,
  RAB,
  Report,
  RequestPengeluaran,
  SplashScreen,
  EditRAB,
  SisaRAB,
  DanaKurang,
  AlihkanDanaKurang,
  DetailPengeluaran,
} from '../pages';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigation {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="RAB" component={RAB} />
      <Tab.Screen name="Realisasi" component={Pengeluaran} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="IntroSlider"
        component={IntroSlider}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Report"
        component={Report}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddRAB"
        component={AddRAB}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditRAB"
        component={EditRAB}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ImportRAB"
        component={ImportRAB}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddPengeluaran"
        component={AddPengeluaran}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListPengeluaran"
        component={ListPengeluaran}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RequestPengeluaran"
        component={RequestPengeluaran}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CheckSisaPengeluaran"
        component={CheckSisaPengeluaran}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SisaRAB"
        component={SisaRAB}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DanaKurang"
        component={DanaKurang}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AlihkanDanaKurang"
        component={AlihkanDanaKurang}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailPengeluaran"
        component={DetailPengeluaran}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
