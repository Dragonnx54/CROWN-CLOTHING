import { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap, selectIsLoading } from '../../store/categories/category.selector';
import styles from './category.module.scss';
import Spinner from '../../components/spinner/spinner.component'
import { CategoryItem } from '../../store/categories/cateogry.types';

type CategoryRouteParams = {
    category: string
}

const Category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const isLoading = useSelector( selectIsLoading );
    const categoriesMap = useSelector( selectCategoriesMap );
    const [ products, setProducts ] = useState(categoriesMap[category] as CategoryItem[]);
    useEffect(() =>{
        setProducts( categoriesMap[category] );
    }, [categoriesMap, category]);
    return(
        <div>
            {isLoading ? <Spinner /> : 
                <Fragment>
                    <h2 className={`${styles.title}`}>{category.toUpperCase()}</h2>
                    <div className={`${styles.container}`}>
                        {
                            products &&
                            products.map((product) => <ProductCard product={product} key={product.id}/>)
                        }
                    </div>
                </Fragment>
            
            }
            
        </div>
    )
}
export default Category;