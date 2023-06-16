import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { CartItem as CartItems } from '../../store/cart/cart.types';
import { selectCartItems, selectIsCartOpen } from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import styles from './cart-dropdown.module.scss';
const CartDropdown = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector( selectIsCartOpen );
    const cartItems: CartItems[] = useSelector( selectCartItems );
    const navigate = useNavigate();

    const goToCheckoutHandler = () =>{
        dispatch( setIsCartOpen(!isCartOpen) );
        navigate('checkout');
    }
    return (
        <div className={`${styles.container}`}>
            {
                cartItems.length 
                ? (
                    <Fragment>
                        <div className={`${styles.cartItems}`}>
                            {
                                cartItems.map( item => <CartItem cartItem={item} key={item.id}/>)
                            }
                        </div>
                        <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
                    </Fragment>
                ): (
                    <span className={`${styles.emptyMessage}`}>No items added</span>
                )
            }
            
            
        </div>
    )
}
export default CartDropdown;