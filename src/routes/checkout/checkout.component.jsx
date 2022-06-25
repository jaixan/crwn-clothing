import './checkout.styles.scss';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
    const {cartItems, cartTotal} = useContext(CartContext);

    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <div className="checkout-header">
          <span className="header-block">Product</span>
          <span className="header-block">Description</span>
          <span className="header-block">Quantity</span>
          <span className="header-block">Price</span>
          <span className="header-block">Remove</span>
        </div>
        <div className="checkout-items-container">
          {cartItems.map((item) => (
            <CheckoutItem key={item.id} cartItem={item} />
          ))}
        </div>
        <div className="total">
          <span>Total:</span>
          <span>$ {cartTotal}</span>
        </div>
      </div>
    );
}

export default Checkout;