import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

import userReducer from '../features/UserSlice'
import tokenreducer from '../features/tokenSlice'

import adminReducer from '../features/AdminSlice'
import admintokenreducer from '../features/AdmintokenSlice'

import techReducer from '../features/TechSlice'
import techtokenreducer from '../features/TokenTechSlice'
// import { PersistPartial } from "redux-persist/es/types";


interface UserState {
    user: Record<string, any>;
}
interface TechState{
    tech:Record<string,any>
}
interface AdminState{
    admin:Record<string,any>
}

interface AdminTokenState{
    admintoken:string
}
interface TechTokenState{
    techtoken:string
}
interface TokenState {
    usertoken: string;
}


const persistConfig={
    key:'root',
    storage,
    blacklist:['usertoken','techtoken','admintoken']
}

const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['usertoken']
};

const techPersistConfig = {
  key: 'tech',
  storage,
  blacklist: ['techtoken']
};

const adminPersistConfig = {
  key: 'admin',
  storage,
  blacklist: ['admintoken']
};

const rootreducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  tech: persistReducer(techPersistConfig, techReducer),
  admin: persistReducer(adminPersistConfig, adminReducer),
  usertoken: tokenreducer,
  techtoken: techtokenreducer,
  admintoken: admintokenreducer,
});

const persistreducer=persistReducer(persistConfig,rootreducer)

export const store = configureStore({
    reducer: persistreducer,
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
});

// Correct RootState type accounting for PersistPartial
export type RootState = {
    user: UserState ;
    usertoken: TokenState ;
    tech:TechState;
    techtoken:TechTokenState;
    admin:AdminState;
    admintoken:AdminTokenState
};

// Dispatch type
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);