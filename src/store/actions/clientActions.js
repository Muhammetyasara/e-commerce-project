import axios from "axios";

const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_ADDRESS_LIST = 'SET_ADDRESS_LIST';
export const SET_CREDIT_CARDS = 'SET_CREDIT_CARDS';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const VERIFY_TOKEN_REQUEST = 'VERIFY_TOKEN_REQUEST';
export const VERIFY_TOKEN_SUCCESS = 'VERIFY_TOKEN_SUCCESS';
export const VERIFY_TOKEN_FAILURE = 'VERIFY_TOKEN_FAILURE';

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const setAddressList = (addressList) => ({
  type: SET_ADDRESS_LIST,
  payload: addressList,
});

export const setCreditCards = (creditCards) => ({
  type: SET_CREDIT_CARDS,
  payload: creditCards,
});

export const loginUser = (credentials, rememberMe = false) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    
    try {
      const response = await api.post("/login", credentials);
      const { token, ...userData } = response.data;
      
      api.defaults.headers.common['Authorization'] = token;
      
      if (rememberMe) {
        localStorage.setItem("token", token);
      }
      
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: userData, token },
      });
      
      dispatch(setUser(userData));
      
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      
      dispatch({
        type: LOGIN_FAILURE,
        payload: errorMessage,
      });
      
      return { success: false, error: errorMessage };
    }
  };
};

export const verifyToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      return { success: false };
    }
    
    dispatch({ type: VERIFY_TOKEN_REQUEST });
    
    try {
      api.defaults.headers.common['Authorization'] = token;

      const response = await api.get("/verify");

      const userData = response.data;

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        api.defaults.headers.common['Authorization'] = response.data.token;
      }
      
      dispatch({
        type: VERIFY_TOKEN_SUCCESS,
        payload: { user: userData, token: response.data.token || token },
      });
      
      dispatch(setUser(userData));
      
      return { success: true, data: userData };
    } catch (error) {
      localStorage.removeItem("token");

      delete api.defaults.headers.common['Authorization'];
      
      dispatch({
        type: VERIFY_TOKEN_FAILURE,
      });
      
      return { success: false };
    }
  };
};


export const logout = () => {

  localStorage.removeItem("token");

  delete api.defaults.headers.common['Authorization'];
  
  return {
    type: LOGOUT,
  };
};

export { api };