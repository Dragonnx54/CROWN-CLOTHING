import styles from './category-preview.module.scss';
import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';

const CategoryPreview = ({title, products}) =>{
    return (
        <div className={`${styles.container}`}>
            <Link to={title}>
                <span className={`${styles.title}`}>{title.toUpperCase()}</span>
            </Link>
            <div className={`${styles.preview}`}>
                {
                    products &&
                    products
                    .filter( (_, index) => index < 4 )
                    .map((product) => <ProductCard key={product.id} product={product}/>)
                }
            </div>
        </div>
    )
}

export default CategoryPreview;