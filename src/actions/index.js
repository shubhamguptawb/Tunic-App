// action types
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
export const ADD_PRODUCT_TO_WISHLIST = "ADD_PRODUCT_TO_WISHLIST";
export const REMOVE_PRODUCT_FROM_WISHLIST = "REMOVE_PRODUCT_FROM_WISHLIST";
export const INCREASE_COUNT = "INCREASE_COUNT";
export const DECREASE_COUNT = "DECREASE_COUNT";

// action creator for adding cart Product to global state
export function addProductToCart(product, size, count, id) {
  return {
    type: ADD_PRODUCT_TO_CART,
    product: { product, size, count, id },
  };
}

// action creators for removing Product from global state
export function removeProductFromCart(id) {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    id,
  };
}

// action creator for adding cart Product to global state
export function addProductToWishlist(product) {
  return {
    type: ADD_PRODUCT_TO_WISHLIST,
    product,
  };
}

// action creators for removing Product from global state
export function removeProductFromWishlist(product) {
  return {
    type: REMOVE_PRODUCT_FROM_WISHLIST,
    product,
  };
}
export function increaseCount(id) {
  return {
    type: INCREASE_COUNT,
    id,
  };
}
export function decreaseCount(id) {
  return {
    type: DECREASE_COUNT,
    id,
  };
}
