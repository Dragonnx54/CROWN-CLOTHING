import { useEffect } from "react";
import { createContext, useState } from "react";

const addCartItem = ( cartItems, productToAdd) =>{
    let existsItem = cartItems.find( cartItem => cartItem.id === productToAdd.id);
    if( existsItem ){
        return cartItems.map( cartItem => cartItem.id ===  productToAdd.id 
            ? {...cartItem, quantity: existsItem.quantity + 1 }
            : cartItem);
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    useEffect(()=>{
        setCartCount(cartItems.reduce((acc, element)=> element.quantity + acc, 0));
    }, [cartItems])

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}