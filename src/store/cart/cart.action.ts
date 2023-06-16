import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/cateogry.types";
import { CartItem } from "./cart.types";
import { CART_ACITON_TYPES } from "./cart.types";

const addCartItem = ( cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] =>{
    const existsItem = cartItems.find( cartItem => cartItem.id === productToAdd.id);
    if(existsItem){
        return cartItems.map( cartItem => cartItem.id ===  productToAdd.id 
            ? {...cartItem, quantity: existsItem.quantity + 1 }
            : cartItem);
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const clearCartItem = ( cartItems: CartItem[], itemCartToClear: CartItem): CartItem[] => {
    return cartItems.filter(item => item.id !== itemCartToClear.id);
}

const removeCartItem = (cartItem: CartItem[], itemCartToRemove: CartItem): CartItem[] => {
    let item = cartItem.find( cartItem => cartItem.id === itemCartToRemove.id );
    if( !item ) return cartItem;
    if( item.quantity === 1)
        return clearCartItem(cartItem,itemCartToRemove);
    return cartItem.map( cartItem => cartItem.id === itemCartToRemove.id ? 
        {...cartItem, quantity: cartItem.quantity - 1 } 
        : cartItem);
}

export type SetIsCartOpen = ActionWithPayload<CART_ACITON_TYPES.SET_CART_OPEN, boolean>;
export type SetCartItems = ActionWithPayload<CART_ACITON_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen = withMatcher((isOpen: boolean) => createAction(CART_ACITON_TYPES.SET_CART_OPEN, isOpen));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACITON_TYPES.SET_CART_ITEMS, cartItems));

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem): SetCartItems => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
};
export const removeItemFromCart = (cartItems: CartItem[], itemCartToRemove: CartItem): SetCartItems =>{
    const newCartItems = removeCartItem(cartItems, itemCartToRemove);
    return setCartItems(newCartItems);
};
export const clearItemFromCart = (cartItems: CartItem[], itemCartToClear: CartItem): SetCartItems => {
    const newCartItems = clearCartItem(cartItems, itemCartToClear);
    return setCartItems(newCartItems);
};
