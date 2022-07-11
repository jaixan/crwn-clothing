import { productType } from "../categories/category.types";

export enum CART_ACTIONS_TYPES {
    UPDATE_CART_ITEMS= 'cart/UPDATE_CART_ITEMS',
    SET_IS_CART_OPEN= 'cart/SET_IS_CART_OPEN',
  }

export type cartItemType = productType & {
  quantity: number;
} 

export type CartState = {
  readonly cartItems: cartItemType[];
  readonly isCartOpen: boolean;
}