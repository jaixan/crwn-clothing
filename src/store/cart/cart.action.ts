import { CART_ACTIONS_TYPES, cartItemType } from "./cart.types";
import {
  createAction,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { productType } from "../categories/category.types";

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTIONS_TYPES.SET_IS_CART_OPEN,
  boolean
>;
export type UpdateCartItems = ActionWithPayload<
  CART_ACTIONS_TYPES.UPDATE_CART_ITEMS,
  cartItemType[]
>;

export const setIsCartOpen = withMatcher(
  (boolean: boolean): SetIsCartOpen =>
    createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, boolean)
);

const addCartItem = (cartItems: cartItemType[], productToAdd: productType): cartItemType[] => {
  const existingCartItem = cartItems.find((x) => x.id === productToAdd.id);
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: cartItemType[],
  cartItemToChange: cartItemType
): cartItemType[] => {
  const existingCartItem = cartItems.find((x) => x.id === cartItemToChange.id);
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
};

const clearCartItem = (
  cartItems: cartItemType[],
  itemToRemove: cartItemType
): cartItemType[] => {
  return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
};

export const updateCartItems = withMatcher(
  (cartItems: cartItemType[]): UpdateCartItems => {
    return createAction(CART_ACTIONS_TYPES.UPDATE_CART_ITEMS, cartItems);
  }
);

export const addItemToCart = (
  cartItems: cartItemType[],
  cartItem: cartItemType | productType
): UpdateCartItems => {
  const newCartItems = addCartItem(cartItems, cartItem);
  return updateCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: cartItemType[],
  cartItemToRemove: cartItemType
): UpdateCartItems => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return updateCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: cartItemType[],
  cartItemToRemove: cartItemType
): UpdateCartItems => {
  const newCartItems = clearCartItem(cartItems, cartItemToRemove);
  return updateCartItems(newCartItems);
};
