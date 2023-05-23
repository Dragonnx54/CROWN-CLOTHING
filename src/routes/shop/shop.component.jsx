import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../../components/categories-preview/categories-preview.component';
import Category from '../category/category.component';
import style from './shop.module.scss';

const Shop = () => {
    return(
       <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category  />}/>
       </Routes>
    )
}
export default Shop;