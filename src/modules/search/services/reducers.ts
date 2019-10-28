import {AnyAction} from "redux";
import {
    GET_FILTERS_DATA,
    REMOVE_SELECTED_FILTER,
    ADD_SELECTED_FILTER
} from './constants';
import {
    prepareFilterOptionsData,
    removeSelectedFilterFromGroup
} from './utils';

export type FilterItemDataType = {
    id: string,
    title: string,
}

export type FilterItemType = {
    id: string,
    title: string,
    children: FilterItemDataType[]
};

export type SelectedFilter = {
    name: string,
    checkedIds: string[]
};

type SearchState = {
    selectedFilters: SelectedFilter[],
    filtersOptions: FilterItemType[]
};

const defaultState = {
    selectedFilters: [
        {
            name: 'construction',
            checkedIds: ['hand loomed', 'dhurrie']
        },
        {
            name: 'material',
            checkedIds: ['synthetics', 'jute & natural fibers',]
        }],
    filtersOptions: []
};

export const search = (state: SearchState = defaultState, action: AnyAction) => {
    switch (action.type) {
        case GET_FILTERS_DATA:
            return {
                ...state,
                filtersOptions: prepareFilterOptionsData(action.payload.response)
            };

        case REMOVE_SELECTED_FILTER:
            return {
                ...state,
                selectedFilters: removeSelectedFilterFromGroup(state.selectedFilters, action.payload)
            };

        case ADD_SELECTED_FILTER:
            return {
                ...state,
                selectedFilters: action.payload.selectedFilters
            };

        default:
            return state
    }
};
