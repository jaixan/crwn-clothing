import {
  CheckoutContainer,
  CheckoutHeader,
  CheckoutHeaderBlock,
  Total,
} from "./checkout.styles";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <CheckoutContainer>
      <h2>Checkout</h2>
      <CheckoutHeader>
        <CheckoutHeaderBlock>Product</CheckoutHeaderBlock>
        <CheckoutHeaderBlock>Description</CheckoutHeaderBlock>
        <CheckoutHeaderBlock>Quantity</CheckoutHeaderBlock>
        <CheckoutHeaderBlock>Price</CheckoutHeaderBlock>
        <CheckoutHeaderBlock>Remove</CheckoutHeaderBlock>
      </CheckoutHeader>
      <div>
        {cartItems.map((item) => (
          <CheckoutItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Total>
        <span>Total:</span>
        <span>$ {cartTotal}</span>
      </Total>
    </CheckoutContainer>
  );
};

export default Checkout;
