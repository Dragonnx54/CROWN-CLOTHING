import { useEffect } from "react";
import { useState, createContext } from "react";
import SHOP_DATA from '../shop-data.json';

export const ProductContext = createContext({
    products: [],
    setProducts: () => []
})

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const value = { products, setProducts};

    useEffect(() => {
        setProducts(SHOP_DATA);
    }, [])

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}