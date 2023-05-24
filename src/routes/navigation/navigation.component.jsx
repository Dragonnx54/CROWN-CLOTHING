import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent  as CrownLogo} from '../../assets/crown.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { CartContext } from '../../contexts/cart.context';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import {NavigationContainer, LogoContainer, NavLink, NavLinks} from './navigation.styles.jsx';

const Navigation = () =>{
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  return(
    <Fragment>
      <NavigationContainer>
          <LogoContainer to={'/'}>
              <CrownLogo/>
          </LogoContainer>
          <NavLinks>
              <NavLink to={'/'}>Home</NavLink>
              <NavLink to={'/shop'} >Shop</NavLink>
              {
                currentUser == null ? 
                (<NavLink to={'/auth'}>Sign in</NavLink>):
                (<NavLink as={'span'} onClick={signOutUser}>Log out</NavLink>) 
              }
              <CartIcon />
          </NavLinks>
          {
            isCartOpen && <CartDropdown />
          }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;