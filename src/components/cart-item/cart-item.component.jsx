import {
  CartItemContainer,
  CartItemName,
  CartItemDetails,
  CartItemImg,
} from "./cart-item.styles";

const CartItem = ({ cartItem }) => {
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
