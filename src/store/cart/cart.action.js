import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACITON_TYPES } from "./cart.types";

export const setIsCartOpen = (isOpen) => createAction(CART_ACITON_TYPES.SET_CART_OPEN, isOpen);

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
    return cartItem.map( cartItem => cartItem.id === itemCartToRemove.id ? 
        {...cartItem, quantity: cartItem.quantity - 1 } 
        : cartItem);
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACITON_TYPES.SET_CART_ITEMS, newCartItems);
}
export const removeItemFromCart = (cartItems, itemCartToRemove) =>{
    const newCartItems = removeCartItem(cartItems, itemCartToRemove);
    return createAction(CART_ACITON_TYPES.SET_CART_ITEMS, newCartItems);
}
export const clearItemFromCart = (cartItems, itemCartToClear) => {
    const newCartItems = clearCartItem(cartItems, itemCartToClear);
    return createAction(CART_ACITON_TYPES.SET_CART_ITEMS, newCartItems);
}