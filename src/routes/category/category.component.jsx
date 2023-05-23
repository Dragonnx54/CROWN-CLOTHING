import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import CategoriesPreview from '../../components/categories-preview/categories-preview.component';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';
import './category.styles.scss';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [ products, setProducts ] = useState(categoriesMap[category]);
    useEffect(() =>{
        setProducts( categoriesMap[category] );
    }, [categoriesMap, category]);
    return(
        <div>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {
                    products &&
                    products.map((product) => <ProductCard product={product} key={product.id}/>)
                }
            </div>
        </div>
    )
}
export default Category;