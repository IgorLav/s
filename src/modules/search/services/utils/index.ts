import {FilterOptionsDataType} from "../types";
import {SelectedFilter} from "../reducers";

export const prepareFilterOptionsData = (data: FilterOptionsDataType) => {
    return Object.keys(data).map(key => {
        const children = data[key];
        return {
            id: key,
            title: key,
            children
        }
    });
};

const isFilterGroupExists = (selectedFilters: SelectedFilter[], key: string) => (
    selectedFilters.find(filterGroup => {
        return filterGroup.name === key
    })
);


export type FilterUpdateData = { key: string, ids: string[] };

export const insertSelectedFilter = (
    selectedFilters: SelectedFilter[], {key, ids}: FilterUpdateData
) => {
    if (isFilterGroupExists(selectedFilters, key)) {
        return selectedFilters.map(filterGroup => (
            filterGroup.name === key ? ({
                ...filterGroup,
                checkedIds: ids
            }) : filterGroup
        ));
    }

    return selectedFilters.concat({
        name: key,
        checkedIds: ids
    })
};

export const removeSelectedFilterFromGroup = (
    selectedFilters: SelectedFilter[],
    payload: {key: string, id: string}
) => {
    return selectedFilters.map(item => {
        if (item.name === payload.key) {
            const checkedIds = item.checkedIds.filter(id => id !== payload.id);

            return {...item, checkedIds} ;
        }
        return item;
    }).filter(item => item.checkedIds.length);
};