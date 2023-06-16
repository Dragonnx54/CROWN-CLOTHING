import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { Action, ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { Category, CATEGORY_ACTION_TYPES } from "./cateogry.types";

export type FecthCategoriesStart = Action<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START>;
export type FecthCategoriesSuccess = ActionWithPayload<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;
export type FecthCategoriesFailed = ActionWithPayload<CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;

export const fetchCategoriesStart = withMatcher((): FecthCategoriesStart => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): FecthCategoriesSuccess => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray));

export const fetchCategoriesFailed = withMatcher((error: Error): FecthCategoriesFailed => createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));

/*export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch( fetchCategoriesStart() );
    try{
        const categoriesArray = await getCategoriesAndDocuments();
        dispatch( fetchCategoriesSuccess(categoriesArray) );
    }catch(error){
        dispatch( fetchCategoriesFailed(error) )
    }
}*/