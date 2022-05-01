import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  REMOVE_PRODUCT_FROM_WISHLIST,
  ADD_PRODUCT_TO_WISHLIST,
  INCREASE_COUNT,
  DECREASE_COUNT,
} from "../actions";

const initialProductState = {
  cart: [],
  wishlist: [],
};

export default function Products(state = initialProductState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cart: [action.product, ...state.cart],
      };

    case REMOVE_PRODUCT_FROM_CART:
      let filteredArray = state.cart.filter(
        (product) => product.id != action.id
      );

      return {
        ...state,
        cart: filteredArray,
      };

    case INCREASE_COUNT:
      let product = state.cart.filter((product) => product.id === action.id)[0];

      product.count++;

      let newArray = state.cart.filter((product) => product.id != action.id);

      newArray = [product, ...newArray];

      return {
        ...state,
        cart: newArray,
      };

    case DECREASE_COUNT:
      let prod = state.cart.filter((product) => product.id === action.id)[0];

      prod.count = prod.count - 1;

      let newcount = state.cart.filter((product) => product.id != action.id);

      newcount = [prod, ...newcount];

      return {
        ...state,
        cart: newcount,
      };

    case ADD_PRODUCT_TO_WISHLIST:
      return {
        ...state,
        wishlist: [action.product, ...state.wishlist],
      };

    case REMOVE_PRODUCT_FROM_WISHLIST:
      const filtered = state.wishlist.filter(
        (product) => product.productId !== action.product.productId
      );

      return {
        ...state,
        wishlist: filtered,
      };

    default: {
      return {
        ...state,
      };
    }
  }
}
