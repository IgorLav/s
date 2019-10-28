import {applyMiddleware, createStore, compose} from 'redux';
import {rootReducer} from '../services';
import thunk from "redux-thunk";

export const store = createStore(
    rootReducer,
    {},
    compose(applyMiddleware(thunk))
);
