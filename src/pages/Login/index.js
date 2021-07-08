import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import normalize from 'react-native-normalize';
import {useDispatch} from 'react-redux';
import {Button, Header, TextInput} from '../../components';
import {signInAction} from '../../redux/action/auth';
import {useForm} from '../../utils';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(signInAction(form, navigation));
  };
  return (
    <View style={styles.page}>
      <Header title="Login" />
      <View style={styles.container}>
        <TextInput
          placeholder="Email"
          value={form.email}
          onChangeText={(value) => setForm('email', value)}
        />
        <TextInput
          placeholder="Password"
          value={form.password}
          onChangeText={(value) => setForm('password', value)}
          secureTextEntry
        />
      </View>
      <View style={styles.button}>
        <Button text="Masuk" onPress={onSubmit} />
      </View>
      <Text style={styles.version}>Versi 1.0.0</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: normalize(20),
  },
  container: {
    flex: 1,
    paddingTop: normalize(60),
  },
  button: {
    marginBottom: normalize(40),
  },
  version: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(14),
    color: '#6D6D6D',
    textAlign: 'center',
    marginBottom: normalize(31),
  },
});
