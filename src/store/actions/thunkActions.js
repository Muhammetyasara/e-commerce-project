import api from '../../api/axios';
import { setRoles } from './clientActions';
import { setCategories, setProductList, setTotal, setFetchState } from './productActions';

export const fetchRoles = () => {
  return async (dispatch, getState) => {
    const { client } = getState();
    
    if (client.roles.length > 0) {
      return;
    }

    try {
      const response = await api.get('/roles');
      dispatch(setRoles(response.data));
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      dispatch(setFetchState('FETCHING'));
      const response = await api.get('/categories');
      dispatch(setCategories(response.data));
      dispatch(setFetchState('FETCHED'));
    } catch (error) {
      console.error('Error fetching categories:', error);
      dispatch(setFetchState('FAILED'));
    }
  };
};

export const fetchProducts = (params = {}) => {
  return async (dispatch) => {
    try {
      dispatch(setFetchState('FETCHING'));
      const { category, filter, sort, limit = 25, offset = 0 } = params;
      
      const queryParams = new URLSearchParams();
      if (category) queryParams.append('category', category);
      if (filter) queryParams.append('filter', filter);
      if (sort) queryParams.append('sort', sort);
      queryParams.append('limit', limit);
      queryParams.append('offset', offset);

      const response = await api.get(`/products?${queryParams.toString()}`);
      dispatch(setProductList(response.data.products));
      dispatch(setTotal(response.data.total));
      dispatch(setFetchState('FETCHED'));
    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch(setFetchState('FAILED'));
    }
  };
};