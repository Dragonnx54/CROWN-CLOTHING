import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../../components/categories-preview/categories-preview.component';
import { CategoriesProvider } from '../../contexts/categories.context';
import Category from '../category/category.component';
import style from './shop.module.scss';
import { setCategoriesArray } from '../../store/categories/category.action';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { useDispatch } from 'react-redux';


const Shop = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        //you don't set useEffect as async function, you create async functions inside UseEffect then we call it
        const getCategoriesMap = async() =>{
            const categoriesArray = await getCategoriesAndDocuments();
            console.log(':v', categoriesArray);
            dispatch( setCategoriesArray(categoriesArray) );
        }
        getCategoriesMap();
    }, []);

    return(
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category  />}/>
        </Routes>
    )
}
export default Shop;