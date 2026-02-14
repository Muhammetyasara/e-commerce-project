import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  CLEAR_CART,
  TOGGLE_CART_ITEM,
  INCREASE_CART_ITEM,
  DECREASE_CART_ITEM,
  REMOVE_CART_ITEM,
} from '../actions/shoppingCartActions';

const getInitialCart = () => {
  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : [];
};

const initialState = {
  cart: getInitialCart(),
  payment: {},
  address: {},
};

const saveCartToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const shoppingCartReducer = (state = initialState, action) => {
  let updatedCart;

  switch (action.type) {
    case SET_CART:
      saveCartToStorage(action.payload);
      return { ...state, cart: action.payload };

    case ADD_TO_CART: {
      const existingItem = state.cart.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        updatedCart = state.cart.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        updatedCart = [
          ...state.cart,
          { count: 1, checked: true, product: action.payload },
        ];
      }

      saveCartToStorage(updatedCart);
      return { ...state, cart: updatedCart };
    }

    case REMOVE_FROM_CART:
    case REMOVE_CART_ITEM:
      updatedCart = state.cart.filter(
        (item) => item.product.id !== action.payload
      );
      saveCartToStorage(updatedCart);
      return { ...state, cart: updatedCart };

    case UPDATE_CART_ITEM:
      updatedCart = state.cart.map((item) =>
        item.product.id === action.payload.productId
          ? { ...item, count: action.payload.count }
          : item
      );
      saveCartToStorage(updatedCart);
      return { ...state, cart: updatedCart };

    case INCREASE_CART_ITEM:
      updatedCart = state.cart.map((item) =>
        item.product.id === action.payload
          ? { ...item, count: item.count + 1 }
          : item
      );
      saveCartToStorage(updatedCart);
      return { ...state, cart: updatedCart };

    case DECREASE_CART_ITEM:
      updatedCart = state.cart
        .map((item) =>
          item.product.id === action.payload
            ? { ...item, count: item.count - 1 }
            : item
        )
        .filter((item) => item.count > 0);
      saveCartToStorage(updatedCart);
      return { ...state, cart: updatedCart };

    case TOGGLE_CART_ITEM:
      updatedCart = state.cart.map((item) =>
        item.product.id === action.payload
          ? { ...item, checked: !item.checked }
          : item
      );
      saveCartToStorage(updatedCart);
      return { ...state, cart: updatedCart };

    case CLEAR_CART:
      localStorage.removeItem('cart');
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
