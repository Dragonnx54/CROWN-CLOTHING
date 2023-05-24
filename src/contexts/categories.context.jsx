import { useState, createContext, useEffect } from "react";
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: [],
    setCategoriesMap: () => []
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState([]);
    const value = { categoriesMap, setCategoriesMap};

    /*useEffect(() => {
        addCollectionAndDocuments( 'categories', SHOP_DATA );
    }, [])*/

    useEffect(()=>{
        //you don't set useEffect as async function, you create async functions inside UseEffect then we call it
        const getCategoriesMap = async() =>{
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, []);

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}