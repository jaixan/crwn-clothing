import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";


const CartIcon = () => {
    
    const { ToggleIsCartVisible, cartCount } = useContext(CartContext);

    const CartIconClickedHandler = () => {
        ToggleIsCartVisible();
    }

    return (
        <CartIconContainer onClick={CartIconClickedHandler}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;
