import { Fragment, useCallback, useMemo, useState } from 'react';
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
    const [ temp, setTemp] = useState("A");
    const [count, setCount] = useState(0);

    const goToCheckoutHandler = useCallback(() =>{
        //this use callback hook will memoize the fuction
        dispatch( setIsCartOpen(!isCartOpen) );
        navigate('checkout');
    }, [isCartOpen]);
    /*const goToCheckoutHandler2 = useCallback(() =>{
        console.log(temp);
        
        //if there are variables inside useCallback, you will need to set them on the dependecy object otherwise it will keep old values
        dispatch( setIsCartOpen(!isCartOpen) );
        navigate('checkout');
    }, [isCartOpen, temp]);*/

    const hundredCount = useMemo(async () => {
        console.log('start');
        await new Promise<void>((resolve, reject) => {
          setTimeout(resolve, 1000)  
        });
        console.log('end');
        setCount(count + 100);
    }, [count]);

    return (
        <div className={`${styles.container}`}>
            {count}
            {
                <Button onClick={() => setCount(count+1)}>GO TO CHECKOUT</Button>
            }
            {/*
                cartItems.length 
                ? (
                    <Fragment>
                        <div className={`${styles.cartItems}`}>
                            {
                                cartItems.map( item => <CartItem cartItem={item} key={item.id}/>)
                            }
                        </div>
                        <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
                        {/*<Button onClick={() => setTemp("B")}>GO TO CHECKOUT</Button>}
                        <Button onClick={() => setCount(count+1)}>GO TO CHECKOUT</Button>
                    </Fragment>
                ): (
                    <span className={`${styles.emptyMessage}`}>No items added</span>
                )*/
            }
            
            
        </div>
    )
}
export default CartDropdown;