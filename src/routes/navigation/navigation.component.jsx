import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import './navigation.styles.scss';


const Navigation = () =>  {

    const { currentUser } = useContext(UserContext);
    const { cartVisible } = useContext(CartContext);

    return (
      <Fragment>
        <div className="navigation">
          <Link className="logo-container" to="/">
            <Logo className="logo" />
          </Link>
          <div className="nav-links-container">
            <Link className="nav-link" to="/shop">
              SHOP
            </Link>
            {currentUser ? (
              <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
            ) : (
              <Link className="nav-link" to="/authentication">
                SIGN IN
              </Link>
            )}
            <CartIcon/>
          </div>
          {cartVisible && <CartDropdown />}
        </div>
        <Outlet />
      </Fragment>
    );
  }

export default Navigation;