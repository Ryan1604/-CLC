import Axios from 'axios';
import {API_HOST} from '../../config/API';
import {showMessage} from '../../utils';
import {setLoading} from './global';

export const submitAction = (id, navigation) => (dispatch) => {
  dispatch(setLoading(true));
  Axios.post(`${API_HOST.url}rab/ajukan/${id}`)
    .then((res) => {
      dispatch(setLoading(false));

      navigation.goBack();
    })
    .catch((err) => {
      dispatch(setLoading(false));
      showMessage(err.response.data.meta.message);
    });
};

export const cancelAction = (id) => (dispatch) => {
  dispatch(setLoading(true));
  Axios.post(`${API_HOST.url}rab/batal/${id}`)
    .then((res) => {
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      showMessage(err.response.data.meta.message);
    });
};

export const addRAB = (data, navigation) => (dispatch) => {
  dispatch(setLoading(true));
  Axios.post(`${API_HOST.url}rab/`, data)
    .then((res) => {
      dispatch(setLoading(false));
      navigation.goBack();
    })
    .catch((err) => {
      dispatch(setLoading(false));
      showMessage(err.response.data.meta.message);
    });
};

export const editRAB = (id, data, navigation) => (dispatch) => {
  dispatch(setLoading(true));
  Axios.put(`${API_HOST.url}rab/${id}`, data)
    .then((result) => {
      showMessage(result.data.meta.message);
      dispatch(setLoading(false));
      navigation.goBack();
    })
    .catch((err) => {
      console.log(err.response);
    });
};
