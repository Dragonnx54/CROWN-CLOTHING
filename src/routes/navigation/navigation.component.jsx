import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent  as CrownLogo} from '../../assets/crown.svg';
import './navigation.component.scss';

const Navigation = () =>{
    return(
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to={'/'}>
                <CrownLogo className='logo'/>
            </Link>
            <div className='nav-links-container'>
                <Link to={'/'} className='nav-link'>Home</Link>
                <Link to={'/shop'} className='nav-link'>Shop</Link>
                <Link to={'/signin'} className='nav-link'>Sign in</Link>
            </div>
        </div>
        <Outlet />
      </Fragment>
    )
}

export default Navigation;