import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.scss';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

const CartIcon = () => {
    
    const { cartVisible, setCartVisible, cartCount } = useContext(CartContext);

    const CartIconClickedHandler = () => {
        setCartVisible(!cartVisible);
        console.log(cartVisible);
    }

    return (
        <div className="cart-icon-container" onClick={CartIconClickedHandler}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{cartCount}</span>
        </div>
    );
}

export default CartIcon;
