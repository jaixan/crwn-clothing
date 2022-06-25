import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';


const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, quantity, price} = cartItem;
    const { removeItemFromCart, increaseItemQuantity, decreaseItemQuantity } =
      useContext(CartContext);

    const removeCartItem = () => removeItemFromCart(cartItem);
    const decreaseCartItemQuantity = () => decreaseItemQuantity(cartItem);
    const increaseCartItemQuantity = () => increaseItemQuantity(cartItem);

    return (
      <div className="checkout-item-container">
        <div className="image-container">
          <img src={imageUrl} alt={`${name}`} />
        </div>

        <div className="name">{name}</div>
        <div className="quantity">
          <span className="arrow" onClick={decreaseCartItemQuantity}>&#10094;</span>
          <span className="value">{quantity}</span>
          <span className="arrow" onClick={increaseCartItemQuantity}>&#10095;</span>
        </div>
        <div className="price">{price}</div>
        <div className="remove-button" onClick={removeCartItem}>
          &#10005;
        </div>
      </div>
    );
}

export default CheckoutItem;