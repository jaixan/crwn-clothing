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
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  const { removeItemFromCart, increaseItemQuantity, decreaseItemQuantity } =
    useContext(CartContext);

  const removeCartItem = () => removeItemFromCart(cartItem);
  const decreaseCartItemQuantity = () => decreaseItemQuantity(cartItem);
  const increaseCartItemQuantity = () => increaseItemQuantity(cartItem);

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
