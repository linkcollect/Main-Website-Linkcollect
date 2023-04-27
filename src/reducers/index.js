import { combineReducers, createStore } from "redux";
import  authReducers from "./authReducers"

const reducers = combineReducers({
    auth:authReducers
});

export const store = createStore(reducers); 