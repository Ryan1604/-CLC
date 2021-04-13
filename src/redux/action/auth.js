import Axios from 'axios';
import {showMessage} from '../../utils';
import {setLoading} from './global';
import storage from '../../utils/storage';

const API_HOST = {
  url: 'https://api.laporanclcsmp.com/api/v1/',
};

export const signInAction = (form, navigation) => (dispatch) => {
  dispatch(setLoading(true));
  Axios.post(`${API_HOST.url}auth`, form)
    .then((res) => {
      const refreshToken = res.data.data.refreshToken;
      const token = res.data.data.token;
      const profile = res.data.data.user;

      dispatch(setLoading(false));

      storage.save({
        key: 'token',
        data: token,
      });
      storage.save({
        key: 'profile',
        data: profile,
      });
      storage.save({
        key: 'refreshToken',
        data: refreshToken,
      });

      navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
    })
    .catch((err) => {
      dispatch(setLoading(false));
      showMessage(err.response.data.meta.message);
    });
};

export const getSaldo = (id) => (dispatch) => {
  storage
    .load({
      key: 'token',
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        someFlag: true,
      },
    })
    .then((res) => {
      Axios.get(`${API_HOST.url}saldo/${id}`, {
        headers: {
          Authorization: `Bearer ${res}`,
        },
      })
        .then((result) => {
          dispatch({type: 'GET_SALDO', value: result.data.saldo});
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch(() => {});
};

export const updateProfile = (data) => (dispatch) => {
  storage
    .load({
      key: 'token',
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        someFlag: true,
      },
    })
    .then((resToken) => {
      dispatch(setLoading(true));
      Axios.put(`${API_HOST.url}cabang`, data, {
        headers: {
          Authorization: `Bearer ${resToken}`,
        },
      })
        .then((result) => {
          console.log(result);
          showMessage(result.data.meta.message, 'success');
          dispatch(setLoading(false));
        })
        .catch((err) => {
          console.log(err.response);
          dispatch(setLoading(false));
        });
    })
    .catch(() => {});
};
