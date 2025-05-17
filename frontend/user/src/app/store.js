import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from '../features/UserSlice';
import tokenreducer from '../features/tokenSlice';
import adminReducer from '../features/AdminSlice';
import admintokenreducer from '../features/AdmintokenSlice';
import techReducer from '../features/TechSlice';
import techtokenreducer from '../features/TokenTechSlice';
const persistConfig = {
    key: 'root',
    storage,
    blackList: ['usertoken', 'techtoken', 'admintoken']
};
const rootreducer = combineReducers({
    admin: adminReducer,
    tech: techReducer,
    user: userReducer,
    usertoken: tokenreducer,
    admintoken: admintokenreducer,
    techtoken: techtokenreducer
});
const persistreducer = persistReducer(persistConfig, rootreducer);
export const store = configureStore({
    reducer: persistreducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
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
export const persistor = persistStore(store);
