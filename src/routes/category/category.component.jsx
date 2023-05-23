import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';
import styles from './category.module.scss';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [ products, setProducts ] = useState(categoriesMap[category]);
    useEffect(() =>{
        setProducts( categoriesMap[category] );
    }, [categoriesMap, category]);
    return(
        <div>
            <h2 className={`${styles.title}`}>{category.toUpperCase()}</h2>
            <div className={`${styles.container}`}>
                {
                    products &&
                    products.map((product) => <ProductCard product={product} key={product.id}/>)
                }
            </div>
        </div>
    )
}
export default Category;