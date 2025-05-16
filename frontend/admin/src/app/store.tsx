import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

import adminreducer from '../features/AdminSlice'
import tokenReducer from '../features/tokenSlice'

interface TokenState{
    token:string
}

interface AdminState{
    admin:Record<string,any>
}

const persistConfig={
    key:"root",
    storage,
    blackList:['token']
}

const rootreducer=combineReducers({
    admin:adminreducer,
    token:tokenReducer
})

const persistreducer=persistReducer(persistConfig,rootreducer)

export const store=configureStore({
    reducer:persistreducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // This should be an array of action types to ignore
                ignoredActions: [
                    FLUSH, 
                    REHYDRATE, 
                    PAUSE, 
                    PERSIST, 
                    PURGE, 
                    REGISTER
                ],
            },
        }), // This will return the middlewares properly
})

export type RootState = {
    admin:AdminState;
    token: TokenState ;
};

// Dispatch type
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);