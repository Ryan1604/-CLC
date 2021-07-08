import Axios from 'axios';
import {API_HOST} from '../../config/API';
import {showMessage} from '../../utils';
import {getData, storeData} from '../../utils/storage';
import {setLoading} from './global';

export const signInAction = (form, navigation) => (dispatch) => {
  dispatch(setLoading(true));
  Axios.post(`${API_HOST.url}auth`, form)
    .then((res) => {
      const token = res.data.data.token;
      const profile = res.data.data.user;

      dispatch(setLoading(false));

      storeData('token', token);
      storeData('profile', profile);

      navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
    })
    .catch((err) => {
      dispatch(setLoading(false));
      showMessage(err.response.data.meta.message);
    });
};

export const updateProfile = (data, navigation) => (dispatch) => {
  getData('token').then((res) => {
    if (res) {
      dispatch(setLoading(true));
      Axios.put(`${API_HOST.url}cabang`, data, {
        headers: {
          Authorization: `Bearer ${res}`,
        },
      })
        .then((result) => {
          showMessage(result.data.meta.message, 'success');
          dispatch(setLoading(false));
          navigation.goBack();
        })
        .catch((err) => {
          showMessage(err.response.data.error.message);
          dispatch(setLoading(false));
        });
    }
  });
};
