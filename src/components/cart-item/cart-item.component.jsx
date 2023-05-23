import styles from './cart-item.module.scss';

const CartItem = ({cartItem}) => {
    const {name, quantity, imageUrl, price} = cartItem;
    return(
        <div className={`${styles.container}`}>
            <img src={imageUrl} alt={name}/>
            <div className={`${styles.itemDetails}`}>
                <span className={`${styles.name}`}>{name}</span>
                <span>{`${quantity} x $${price}`}</span>
            </div>
        </div>
    )
}

export default CartItem;