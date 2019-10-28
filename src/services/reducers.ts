import {combineReducers} from 'redux';
import {search} from "../modules/search/services/reducers";

export const rootReducer = combineReducers({
    search
});

export type AppState = ReturnType<typeof rootReducer>