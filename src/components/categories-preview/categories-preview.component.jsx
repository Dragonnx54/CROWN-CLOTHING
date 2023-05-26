import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectIsLoading } from '../../store/categories/category.selector';
import CategoryPreview from '../category-preview/category-preview.component';
import Spinner from '../spinner/spinner.component';
import styles from './categories-preview.module.scss';

const CategoriesPreview = () => {
    const categories = useSelector( selectCategoriesMap );
    const isLoading = useSelector( selectIsLoading );
    return (
        <Fragment>
            {
                isLoading ? 
                <Spinner /> : 
                <Fragment>
                    {
                        Object.keys(categories).map(title =>{
                            const categoryProducts = categories[title];
                            return <CategoryPreview key={title} title={title} products={categoryProducts}></CategoryPreview>
                        })
                    }
                </Fragment>
            }
        </Fragment>
    )
}

export default CategoriesPreview;