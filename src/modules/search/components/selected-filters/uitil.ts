import {FilterItemType, SelectedFilter} from "../../services/reducers";

type Params = {
    selectedFilters: SelectedFilter[],
    filtersOptions?: FilterItemType[]
};

export const preparePillsData = ({selectedFilters, filtersOptions}: Params) => {
    if (filtersOptions) {
        return selectedFilters.map(item => {
            const optionData = filtersOptions.find(group => group.id === item.name);

            const children = optionData ?
                item.checkedIds.map(id => {
                    const data = optionData.children.find(option => id === option.id);
                    return data ? {
                        id: data.id,
                        groupId: item.name,
                        caption: data.title,
                        removable: true,
                        disabled: false
                    } : null
                }).filter(Boolean) : [];

            return {...item, children}
        });
    }

    return [];
};