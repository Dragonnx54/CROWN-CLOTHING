import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loggerMiddleware } from "./middleware/logger";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from "./root-saga";

//root reducer

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

//filter(Boolean) filters out falsy values
const middleWares = [ process.env.NODE_ENV !== 'production' && logger, sagaMiddleware ].filter(Boolean);

/*const thunkMiddleware = (store) => (next) => (action)=>{
    if( typeof(action) === 'function'){
        action(dispatch);
    }
}*/

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnchancers = composeEnhancer(applyMiddleware(...middleWares));
export const store = createStore(persistedReducer, undefined, composedEnchancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);