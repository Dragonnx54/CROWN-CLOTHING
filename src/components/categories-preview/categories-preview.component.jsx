import { useContext } from 'react';
import { Fragment } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../category-preview/category-preview.component';
import './categories-preview.styles.scss';

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map(title =>{
                    const categoryProducts = categoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={categoryProducts}></CategoryPreview>
                })
            }
        </Fragment>
    )
}

export default CategoriesPreview;