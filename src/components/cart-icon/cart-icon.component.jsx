import styles from './cart-icon.module.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
    const { toggleIsCartOpen, cartCount } = useContext(CartContext)

    
    return(
        <div className={`${styles.container}`} onClick={toggleIsCartOpen}>
            <ShoppingIcon className={`${styles.shoppingIcon}`}/>
            <span className={`${styles.itemCount}`}>{cartCount}</span>
        </div>
    )
}

export default CartIcon;