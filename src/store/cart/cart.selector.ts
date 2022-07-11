import { createSelector } from "reselect";
import { RootState } from "../store";
import { cartItemType, CartState } from "./cart.types";

export const selectIsCartOpen = (state: RootState) => state.cart.isCartOpen;

const selectCartReducer = (state: RootState) : CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSlice: CartState) => cartSlice.cartItems
);

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (cartItems: cartItemType[]) =>
    cartItems.reduce(
      (accumulator, cartItem) => accumulator + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems: cartItemType[]) =>
    cartItems.reduce(
      (accumulator, cartItem) =>
        accumulator + cartItem.quantity * cartItem.price,
      0
    )
);
