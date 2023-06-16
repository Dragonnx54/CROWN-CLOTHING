import { CategoryItem } from "../categories/cateogry.types"

export enum CART_ACITON_TYPES {
    SET_CART_OPEN = 'cart/SET_CART_OPEN',
    SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
}

export type CartItem = CategoryItem & {
    quantity: number
}