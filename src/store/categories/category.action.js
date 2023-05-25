import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORY_ACTION_TYPES } from "./cateogry.types";

export const setCategoriesArray = (categoriesArray) =>
    createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categoriesArray);