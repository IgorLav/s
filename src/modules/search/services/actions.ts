import data from './data.json';
import {Dispatch} from 'redux';
import {GET_FILTERS_DATA, ADD_SELECTED_FILTER, REMOVE_SELECTED_FILTER} from './constants';
import {SelectedFilter} from "./reducers";


export const getAvailableFilters = () => (dispatch: Dispatch) => dispatch({
    type: GET_FILTERS_DATA,
    payload: {
        response: data[0]
    }
});

export const addSelectedFilters = (selectedFilters: SelectedFilter[]) => (dispatch: Dispatch) => (
    dispatch({
        type: ADD_SELECTED_FILTER,
        payload: {selectedFilters}
    })
);

export const removeSelectedFilter = (key: string, id: string) => (dispatch: Dispatch) => (
    dispatch({
        type: REMOVE_SELECTED_FILTER,
        payload: {id, key}
    })
);

