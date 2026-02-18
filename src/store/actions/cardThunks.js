import { setCreditCards } from './clientActions';
import api from '../../api/axios';

const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: token } : {};
};

export const fetchCards = () => {
  return async (dispatch) => {
    try {
      const response = await api.get('/user/card', { headers: authHeader() });
      dispatch(setCreditCards(response.data));
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };
};

export const addCard = (cardData) => {
  return async (dispatch) => {
    try {
      await api.post('/user/card', cardData, { headers: authHeader() });
      await dispatch(fetchCards());
    } catch (error) {
      console.error('Error adding card:', error);
      throw error;
    }
  };
};

export const updateCard = (cardData) => {
  return async (dispatch) => {
    try {
      await api.put('/user/card', cardData, { headers: authHeader() });
      await dispatch(fetchCards());
    } catch (error) {
      console.error('Error updating card:', error);
      throw error;
    }
  };
};

export const deleteCard = (cardId) => {
  return async (dispatch) => {
    try {
      await api.delete(`/user/card/${cardId}`, { headers: authHeader() });
      await dispatch(fetchCards());
    } catch (error) {
      console.error('Error deleting card:', error);
      throw error;
    }
  };
};