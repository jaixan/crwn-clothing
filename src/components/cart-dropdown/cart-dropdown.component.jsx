import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import { CartDropdownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles";

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate  = useNavigate();

    const onClickHandler = () => {
        navigate('/checkout');
    }

    return (
      <CartDropdownContainer>
        { cartItems.length ? (<CartItems>
          {cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))}
        </CartItems>) : <EmptyMessage>Your cart is empty</EmptyMessage>}
        <Button onClick={onClickHandler}>Check out</Button>
      </CartDropdownContainer>
    );
}

export default CartDropdown;