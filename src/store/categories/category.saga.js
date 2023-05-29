import { takeLatest, all, call, put } from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';
import { CATEGORY_ACTION_TYPES } from './cateogry.types';

export function* fetchCategoriesAsync(){
    try{
        const categoriesArray = yield call( getCategoriesAndDocuments );
        yield put( fetchCategoriesSuccess(categoriesArray) );
    }catch(error){
        yield put( fetchCategoriesFailed(error) );
    }
}

export function* onFechCategories() {
    yield takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga(){
    yield all([ call(onFechCategories) ]);
}