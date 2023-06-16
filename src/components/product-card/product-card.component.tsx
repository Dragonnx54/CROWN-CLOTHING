import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CategoryItem } from '../../store/categories/cateogry.types';
import Button from '../button/button.component';
import styles from './product-card.module.scss';

type ProductCardProps = {
    product: CategoryItem
}

const ProductCard = ({product}: ProductCardProps) => {
    const {name, price, imageUrl} = product;
    const dispatch = useDispatch();
    const cartItems = useSelector( selectCartItems );

    const addProductToCart = () => dispatch( addItemToCart(cartItems, product) );

    return(
        <div className={`${styles.container}`}>
            <img src={imageUrl} alt={`${name}`}/>
            <div className={`${styles.footer}`}>
                <span className={`${styles.name}`}>{name}</span>
                <span className={`${styles.price}`}>{price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart}>Add to cart</Button>
        </div>
    );
    
}

export default ProductCard;