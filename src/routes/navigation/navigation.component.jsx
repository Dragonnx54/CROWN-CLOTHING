import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent  as CrownLogo} from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase.utils';
import './navigation.component.scss';

const Navigation = () =>{
  const { currentUser } = useContext(UserContext);

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
          </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;