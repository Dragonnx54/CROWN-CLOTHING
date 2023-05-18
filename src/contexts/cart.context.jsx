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

const clearCartItem = ( cartItems, itemCartToClear) => {
    return cartItems.filter(item => item.id !== itemCartToClear.id);
}

const removeCartItem = (cartItem, itemCartToRemove) => {
    let item = cartItem.find( cartItem => cartItem.id === itemCartToRemove.id );
    if( !item ) return;
    if( item.quantity === 1)
        return clearCartItem(cartItem,itemCartToRemove);
    return cartItem.map( cartItem => cartItem.id === itemCartToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1 } : cartItem);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    toggleIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    clearItemFromCart: () => {},
    removeItemFromCart: () => {},
    cartTotal: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState([]);
    const [cartTotal, setTotal] = useState(0);


    const addItemToCart = (productToAdd) => setCartItems(addCartItem(cartItems, productToAdd));
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    const removeItemFromCart = (itemCartToRemove) => setCartItems(removeCartItem(cartItems,itemCartToRemove));
    const clearItemFromCart = (itemCartToClear) => setCartItems(clearCartItem(cartItems,itemCartToClear));

    useEffect(()=>{
        const newCartCount = cartItems.reduce((acc, element)=> element.quantity + acc, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(()=>{
        const newCartTotal = cartItems.reduce( (acc, cartItem) => (cartItem.quantity * cartItem.price) + acc, 0 );
        setTotal(newCartTotal);
    }, [cartItems])

    const value = { isCartOpen, toggleIsCartOpen, cartItems, addItemToCart, cartCount, clearItemFromCart, removeItemFromCart, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}