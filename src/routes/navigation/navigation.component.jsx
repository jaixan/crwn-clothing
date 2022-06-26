import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from "./navigation.styles";


const Navigation = () =>  {

    const { currentUser } = useContext(UserContext);
    const { cartVisible } = useContext(CartContext);

    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to="/">
            <Logo className="logo" />
          </LogoContainer>
          <NavLinks>
            <NavLink to="/shop">
              SHOP
            </NavLink>
            {currentUser ? (
              <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
            ) : (
              <NavLink to="/authentication">
                SIGN IN
              </NavLink>
            )}
            <CartIcon/>
          </NavLinks>
          {cartVisible && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    );
  }

export default Navigation;