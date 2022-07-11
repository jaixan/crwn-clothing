import {
  CartItemContainer,
  CartItemName,
  CartItemDetails,
  CartItemImg,
} from "./cart-item.styles";

import { cartItemType } from "../../store/cart/cart.types";
type cartItemProps = {
  cartItem: cartItemType;
}
const CartItem = ({ cartItem } : cartItemProps) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <CartItemContainer>
      <CartItemImg src={imageUrl} alt={`${name}`} />
      <CartItemDetails>
        <CartItemName>{name}</CartItemName>
        <span>
          {quantity} x {price}
        </span>
      </CartItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
