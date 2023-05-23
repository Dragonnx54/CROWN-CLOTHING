import { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import styles from './cart-dropdown.module.scss';
const CartDropdown = () => {
    const { cartItems, toggleIsCartOpen } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () =>{
        toggleIsCartOpen();
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