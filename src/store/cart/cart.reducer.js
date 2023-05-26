import { CART_ACITON_TYPES } from "./cart.types";

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: []
}

export const cartReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload} = action;
    switch(type){
        case CART_ACITON_TYPES.SET_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        case CART_ACITON_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                cartItems: payload
            }
        default:
            return state;
    }
}