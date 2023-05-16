import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent  as CrownLogo} from '../../assets/crown.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { CartContext } from '../../contexts/cart.context';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase.utils';
import './navigation.component.scss';

const Navigation = () =>{
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  return(
    <Fragment>
      <div className='navigation'>
          <Link className='logo-container' to={'/'}>
              <CrownLogo className='logo'/>
          </Link>
          <div className='nav-links-container'>
              <Link to={'/'} className='nav-link'>Home</Link>
              <Link to={'/shop'} className='nav-link'>Shop</Link>
              {
                currentUser == null ? 
                (<Link to={'/auth'} className='nav-link'>Sign in</Link>):
                (<span className='nav-link' onClick={signOutUser}>Log out</span>) 
              }
              <CartIcon />
          </div>
          {
            isCartOpen && <CartDropdown />
          }
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;