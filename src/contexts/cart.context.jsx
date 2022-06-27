import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

export const CartContext = createContext({
  cartItems: [],
  cartVisible: false,
  addItemToCart: () => null,
  removeItemFromCart: () => null,
  clearItemFromCart: () => null,
  ToggleIsCartVisible: () => null,
  cartCount: 0,
  cartTotal: 0,
});


const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(x => x.id === productToAdd.id);
  if (existingCartItem) {
    return cartItems.map( cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToChange) => {
  const existingCartItem = cartItems.find(x => x.id === cartItemToChange.id);
  if (existingCartItem) {
    if (existingCartItem.quantity - 1 > 0) {
      return cartItems.map((cartItem) =>
        cartItem.id === cartItemToChange.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    }
  }
  return cartItems;
}

const clearCartItem = (cartItems, itemToRemove) => {
  return cartItems.filter(cartItem => cartItem.id !== itemToRemove.id);
}

const INITIAL_STATE = {
  cartItems: [],
  isCartVisible: false,
  cartCount: 0,
  cartTotal: 0,
}

const CART_ACTIONS_TYPES = {
  UPDATE_CART_ITEMS: 'UPDATE_CART_ITEMS',
  TOGGLE_IS_CART_VISIBLE: 'TOGGLE_IS_CART_VISIBLE',
}

const cartItemCount = (cartItems) =>
  cartItems.reduce(
    (accumulator, cartItem) => accumulator + cartItem.quantity,
    0
  );

const cartItemTotal = (cartItems) =>
  cartItems.reduce(
    (accumulator, cartItem) =>
      accumulator + cartItem.quantity * cartItem.price,
    0
  );

const cartReducer = (state, action) => {
  console.log('dispatched');
  console.log(action);
  
  const {type, payload} = action;
  const { isCartVisible } = state;
  switch (type) {
      case CART_ACTIONS_TYPES.UPDATE_CART_ITEMS:
          return {
              ...state,
              ...payload,
          }
      case CART_ACTIONS_TYPES.TOGGLE_IS_CART_VISIBLE:
        console.log(isCartVisible);
        return {
          ...state,
          isCartVisible: !isCartVisible,
        }
      default:
          throw new Error(`type ${type} not supported in cartReducer.`);
  }

}


export const CartProvider = ({ children }) => {

    const [currentCart, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { cartItems, isCartVisible, cartCount, cartTotal } = currentCart;

    const updateCartItems = (newCartItems) => {

      const payload = {
        cartItems: newCartItems,
        cartCount: cartItemCount(newCartItems),
        cartTotal: cartItemTotal(newCartItems),
      }
      dispatch(createAction(CART_ACTIONS_TYPES.UPDATE_CART_ITEMS, payload));
       
    }

    const addItemToCart = (cartItem) => {
        updateCartItems(addCartItem(cartItems, cartItem));
    }

    const removeItemFromCart = (cartItemToRemove) => {
      updateCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToRemove) => {
      updateCartItems(clearCartItem(cartItems, cartItemToRemove));
    }

    const ToggleIsCartVisible = () => {
      dispatch(createAction(CART_ACTIONS_TYPES.TOGGLE_IS_CART_VISIBLE, null));
    }

    return (
      <CartContext.Provider
        value={{
          cartItems,
          addItemToCart,
          removeItemFromCart,
          clearItemFromCart,
          isCartVisible,
          ToggleIsCartVisible,
          cartCount,
          cartTotal,
        }}
      >
        {children}
      </CartContext.Provider>
    );
}
