import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import styles from './checkout.module.scss';

const Checkout = () => {
    const cartItems = useSelector( selectCartItems );
    const cartTotal = useSelector( selectCartTotal );
    return (
        <div className={`${styles.container}`}>
            {
                cartItems.length ? (
                    <Fragment>
                        <div className={`${styles.checkoutHeader}`}>
                            <div className={`${styles.headerBlock}`}>
                                <span>{'Product'}</span>
                            </div>
                            <div className={`${styles.headerBlock}`}>
                                <span>{'Description'}</span>
                            </div>
                            <div className={`${styles.headerBlock}`}>
                                <span>{'Quantity'}</span>
                            </div>
                            <div className={`${styles.headerBlock}`}>
                                <span>{'Price'}</span>
                            </div>
                            <div className={`${styles.headerBlock}`}>
                                <span>{'Remove'}</span>
                            </div>
                        </div>
                        {cartItems.map((cartItem) => (
                            <CheckoutItem cartItem={cartItem} key={cartItem.id}/>
                        ))}
                        
                        <span className={`${styles.total}`}>{`Total $${cartTotal}`}</span>
                    </Fragment>
                ) : (
                    <span>{'No items added yet'}</span>
                )
            }
        </div>
    )
}

export default Checkout;