import { createSelector } from "reselect";
import { RootState } from "../store";
import { CartState } from "./cart.reducer";
import { CartItem } from "./cart.types";

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart): boolean => cart.isCartOpen
);

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart): CartItem[] => cart.cartItems
);

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems): number => cartItems.reduce((acc, element)=> element.quantity + acc, 0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems): number => cartItems.reduce( (acc, cartItem) => (cartItem.quantity * cartItem.price) + acc, 0 )
);