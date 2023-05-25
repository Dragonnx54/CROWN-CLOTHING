import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';
import CategoryPreview from '../category-preview/category-preview.component';
import styles from './categories-preview.module.scss';

const CategoriesPreview = () => {
    const categories = useSelector( selectCategoriesMap );
    return (
        <Fragment>
            {
                Object.keys(categories).map(title =>{
                    const categoryProducts = categories[title];
                    return <CategoryPreview key={title} title={title} products={categoryProducts}></CategoryPreview>
                })
            }
        </Fragment>
    )
}

export default CategoriesPreview;