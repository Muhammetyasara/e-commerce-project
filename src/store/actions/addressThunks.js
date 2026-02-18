import { setAddressList } from './clientActions';
import api from '../../api/axios';

const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: token } : {};
};

export const fetchAddresses = () => {
  return async (dispatch) => {
    try {
      const response = await api.get('/user/address', { headers: authHeader() });
      dispatch(setAddressList(response.data));
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };
};

export const addAddress = (addressData) => {
  return async (dispatch) => {
    try {
      await api.post('/user/address', addressData, { headers: authHeader() });
      await dispatch(fetchAddresses());
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  };
};

export const updateAddress = (addressData) => {
  return async (dispatch) => {
    try {
      await api.put('/user/address', addressData, { headers: authHeader() });
      await dispatch(fetchAddresses());
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  };
};

export const deleteAddress = (addressId) => {
  return async (dispatch) => {
    try {
      await api.delete(`/user/address/${addressId}`, { headers: authHeader() });
      await dispatch(fetchAddresses());
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  };
};