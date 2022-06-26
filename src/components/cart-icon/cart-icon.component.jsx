import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";


const CartIcon = () => {
    
    const { cartVisible, setCartVisible, cartCount } = useContext(CartContext);

    const CartIconClickedHandler = () => {
        setCartVisible(!cartVisible);
        console.log(cartVisible);
    }

    return (
        <CartIconContainer onClick={CartIconClickedHandler}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;
