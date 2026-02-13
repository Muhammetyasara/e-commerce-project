import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  CLEAR_CART,
} from '../actions/shoppingCartActions';

const initialState = {
  cart: [],
  payment: {},
  address: {},
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.payload };

    case ADD_TO_CART: {
      const existingItem = state.cart.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, count: item.count + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { count: 1, product: action.payload }],
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };

    case UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, count: action.payload.count }
            : item
        ),
      };

    case CLEAR_CART:
      return { ...state, cart: [] };

    case SET_PAYMENT:
      return { ...state, payment: action.payload };

    case SET_ADDRESS:
      return { ...state, address: action.payload };

    default:
      return state;
  }
};

export default shoppingCartReducer;