import { useSelector, useDispatch } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectIsCartOpen, selectCartItemCount } from '../../store/cart/cart.selector';

import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";


const CartIcon = () => {
    
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartItemCount);
    
    const CartIconClickedHandler = () => {
        dispatch(setIsCartOpen(!isCartOpen));
    }

    return (
        <CartIconContainer onClick={CartIconClickedHandler}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;
