import styles from './category-preview.module.scss';
import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';
import { Category } from '../../store/categories/cateogry.types';

const CategoryPreview = ({title, items} : Category) =>{
    return (
        <div className={`${styles.container}`}>
            <Link to={title}>
                <span className={`${styles.title}`}>{title.toUpperCase()}</span>
            </Link>
            <div className={`${styles.preview}`}>
                {
                    items &&
                    items
                    .filter( (_, index) => index < 4 )
                    .map((product) => <ProductCard key={product.id} product={product}/>)
                }
            </div>
        </div>
    )
}

export default CategoryPreview;