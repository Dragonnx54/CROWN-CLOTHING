import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap } from '../../store/categories/category.selector';
import styles from './category.module.scss';

const Category = () => {
    console.log('render/rerendering category component');
    const { category } = useParams();
    const categoriesMap = useSelector( selectCategoriesMap );
    const [ products, setProducts ] = useState(categoriesMap[category]);
    useEffect(() =>{
        console.log('effect fired calling setproducts');
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