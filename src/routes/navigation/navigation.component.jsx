import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent  as CrownLogo} from '../../assets/crown.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import {NavigationContainer, LogoContainer, NavLink, NavLinks} from './navigation.styles.jsx';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

const Navigation = () =>{
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector( selectIsCartOpen );
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