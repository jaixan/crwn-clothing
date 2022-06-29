import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

import { ProductCartContainer, Footer, Name, Price } from "./product-card.styles";

import Button from '../button/button.component';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
      <ProductCartContainer>
        <img src={imageUrl} alt={`${name}`}/>
        <Footer>
          <Name>{name}</Name>
          <Price>{price}</Price>
        </Footer>
       <Button buttonType="inverted" onClick={addProductToCart}>Add to cart</Button>
      </ProductCartContainer>
    );
}

export default ProductCard;