import styles from './cart-icon.module.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartIcon = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector( selectIsCartOpen );
    const cartCount = useSelector( selectCartCount );
    const toggleIsCartOpen = () => dispatch( setIsCartOpen(!isCartOpen) );

    
    return(
        <div className={`${styles.container}`} onClick={toggleIsCartOpen}>
            <ShoppingIcon className={`${styles.shoppingIcon}`}/>
            <span className={`${styles.itemCount}`}>{cartCount}</span>
        </div>
    )
}

export default CartIcon;