import { useReducer } from "react";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

export const CART_ACTION_TYPE = {
    SET_CART_OPEN: 'SET_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const cartReducer = (state, action) =>{
    const {type, payload } = action;
    switch(type){
        case CART_ACTION_TYPE.SET_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        case CART_ACTION_TYPE.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
        default:
            throw Error(`Unhandled type ${type} in cartReducer`)
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

export const CartProvider = ({children}) => {
    /*const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState([]);
    const [cartTotal, setTotal] = useState(0);*/
    const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const toggleIsCartOpen = () => dispatch(createAction(CART_ACTION_TYPE.SET_CART_OPEN, !isCartOpen));
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }
    const removeItemFromCart = (itemCartToRemove) =>{
        const newCartItems = removeCartItem(cartItems, itemCartToRemove);
        updateCartItemsReducer(newCartItems);
    }
    const clearItemFromCart = (itemCartToClear) => {
        const newCartItems = clearCartItem(cartItems, itemCartToClear);
        updateCartItemsReducer(newCartItems);
    }

    /*useEffect(()=>{
        const newCartCount = cartItems.reduce((acc, element)=> element.quantity + acc, 0);
        dispatch({type: CART_ACTION_TYPE.SET_CART_COUNT, payload: newCartCount});
    }, [cartItems])

    useEffect(()=>{
        const newCartTotal = cartItems.reduce( (acc, cartItem) => (cartItem.quantity * cartItem.price) + acc, 0 );
        dispatch({type: CART_ACTION_TYPE.SET_CART_TOTAL, payload: newCartTotal});
    }, [cartItems])*/

    const updateCartItemsReducer = (newCartItems) =>{
        const newCartCount = newCartItems.reduce((acc, element)=> element.quantity + acc, 0);
        const newCartTotal = newCartItems.reduce( (acc, cartItem) => (cartItem.quantity * cartItem.price) + acc, 0 );
        const newObject = {
            cartItems: newCartItems,
            cartCount: newCartCount,
            cartTotal: newCartTotal
        }
        dispatch( createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newObject));
    }

    const value = { isCartOpen, toggleIsCartOpen, cartItems, addItemToCart, cartCount, clearItemFromCart, removeItemFromCart, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}