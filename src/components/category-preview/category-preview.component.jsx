import './category-preview.styles.scss';
import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';

const CategoryPreview = ({title, products}) =>{
    return (
        <div className='category-preview-container'>
            <Link to={title}>
                <span className='title'>{title.toUpperCase()}</span>
            </Link>
            <div className='preview'>
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