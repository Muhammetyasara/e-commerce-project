import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
  SET_ADDRESS_LIST,
  SET_CREDIT_CARDS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILURE,
} from '../actions/clientActions';

const initialState = {
  user: {},
  addressList: [],
  creditCards: [],
  roles: [],
  theme: '',
  language: '',
  token: null,
  loading: false,
  error: null,
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_ROLES:
      return { ...state, roles: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    case SET_ADDRESS_LIST:
      return { ...state, addressList: action.payload };
    case SET_CREDIT_CARDS:
      return { ...state, creditCards: action.payload };
    
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    case VERIFY_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case VERIFY_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case VERIFY_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        user: {},
        token: null,
      };
    
    case LOGOUT:
      return {
        ...state,
        user: {},
        token: null,
      };
    
    default:
      return state;
  }
};

export default clientReducer;