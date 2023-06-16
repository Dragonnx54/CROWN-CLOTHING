import { AnyAction } from "redux";
import { fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess } from "./category.action";
import { Category, CATEGORY_ACTION_TYPES } from "./cateogry.types";

export type CategoriesState = {
    readonly categories: Category[],
    readonly isLoading: boolean,
    readonly error: Error | null
}

const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null
}

export const categoryReducer = (state = CATEGORIES_INITIAL_STATE, action: AnyAction): CategoriesState =>{
    if( fetchCategoriesStart.match(action) ){
        return {
            ...state,
            isLoading: true
        }
    }

    if( fetchCategoriesSuccess.match(action) ){
        return {
            ...state,
            categories: action.payload,
            isLoading: false
        }
    }

    if( fetchCategoriesFailed.match(action) ){
        return {
            ...state,
            error: action.payload,
            isLoading: false
        }
    }
    return state;
}