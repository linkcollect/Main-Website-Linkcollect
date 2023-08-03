import { applyMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "./Slices/user.slice"
import userCollectionSlice from "./Slices/collection.slice";
const reducers = {
    auth:authReducer.reducer,
    collection:userCollectionSlice.reducer,
}
export const store = configureStore({
    reducer:reducers,
    middleware:(getDefaultMiddleWare)=>getDefaultMiddleWare().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',
});