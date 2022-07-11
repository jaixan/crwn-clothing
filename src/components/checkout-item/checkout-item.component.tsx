import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { cartItemType } from "../../store/cart/cart.types";

import {
  CheckOutItemContainer,
  CheckOutItemImage,
  CheckoutItemArrow,
  CheckoutItemImageContainer,
  CheckoutItemName,
  CheckoutItemPrice,
  CheckoutItemQuantity,
  CheckoutItemRemoveButton,
  CheckoutItemValue,
} from "./checkout-item.styles";

export type CheckoutItemProps = {
  cartItem: cartItemType;
}

const CheckoutItem = ({ cartItem }: CheckoutItemProps) => {
  const { name, imageUrl, quantity, price } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const removeCartItem = () => dispatch(clearItemFromCart(cartItems, cartItem));
  const decreaseCartItemQuantity = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));
  const increaseCartItemQuantity = () =>
    dispatch(addItemToCart(cartItems, cartItem));

  return (
    <CheckOutItemContainer>
      <CheckoutItemImageContainer>
        <CheckOutItemImage src={imageUrl} alt={`${name}`} />
      </CheckoutItemImageContainer>

      <CheckoutItemName>{name}</CheckoutItemName>
      <CheckoutItemQuantity>
        <CheckoutItemArrow onClick={decreaseCartItemQuantity}>
          &#10094;
        </CheckoutItemArrow>
        <CheckoutItemValue>{quantity}</CheckoutItemValue>
        <CheckoutItemArrow onClick={increaseCartItemQuantity}>
          &#10095;
        </CheckoutItemArrow>
      </CheckoutItemQuantity>
      <CheckoutItemPrice>{price}</CheckoutItemPrice>
      <CheckoutItemRemoveButton onClick={removeCartItem}>
        &#10005;
      </CheckoutItemRemoveButton>
    </CheckOutItemContainer>
  );
};

export default CheckoutItem;
