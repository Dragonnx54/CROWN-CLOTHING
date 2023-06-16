import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent  as CrownLogo} from '../../assets/crown.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import {NavigationContainer, LogoContainer, NavLink, NavLinks} from './navigation.styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';

const Navigation = () =>{
  const dispatcher = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector( selectIsCartOpen );
  const signOutHandler = () => dispatcher( signOutStart() );
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
                (<NavLink as={'span'} onClick={signOutHandler}>Log out</NavLink>) 
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