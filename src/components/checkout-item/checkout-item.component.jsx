import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, clearItemFromCart, removeItemFromCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import styles from './checkout-item.module.scss';

const CheckoutItem = ({cartItem}) => {
    const {imageUrl, name, quantity, price} = cartItem;
    const cartItems = useSelector( selectCartItems );
    const dispatch = useDispatch();

    const removeItemHandler = () => dispatch( removeItemFromCart(cartItems,cartItem) );
    const clearItemHandler = () => dispatch( clearItemFromCart(cartItems,cartItem) );
    const addItemHandler = () => dispatch( addItemToCart(cartItems,cartItem) );
    
    return(
        <div className={`${styles.container}`}>
            <div className={`${styles.imageContainer}`}>
                <img src={imageUrl} alt={name}/>
            </div>
            <span className={`${styles.name}`}>{name}</span>
            
            <span className={`${styles.quantity}`}>
                <div onClick={removeItemHandler} className={`${styles.arrow}`}>&#10094;</div>
                <span className={`${styles.value}`}>{quantity}</span>
                <div onClick={addItemHandler} className={`${styles.arrow}`}>&#10095;</div>
            </span>
            <span className={`${styles.price}`}>{price}</span>
            <div onClick={clearItemHandler} className={`${styles.removeButton}`}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;