import React, {Component} from 'react';
import {connect} from "react-redux";
import {AppState} from "../../../../services/reducers";
import {SmartMenuComponent} from "../../../../components/smart-menu";
import {MenuItemData} from "../../../../components/smart-menu/smart-menu-item.component";
import {addSelectedFilters, getAvailableFilters, removeSelectedFilter} from "../../services/actions";
import {SelectedFilter, FilterItemType} from '../../services/reducers';
import {FilterController, FilterView} from './components';
import './styles.scss';
import {Dropdown} from "../../../../components/core/dropdown";
import {CollapsibleHandler} from "../../../../components/collapsible-handler";
import {ChildrenProps} from "./components/filter.controller";
import {Button} from "../../../../components/core/button";
import {FilterUpdateData, insertSelectedFilter} from "../../services/utils";


type FilterItemData = {
    id: string,
    title: string
    children?: FilterItemData[]
};

type OwnProps = {};

type StateProps = {
    selectedFilters: SelectedFilter[],
    filtersOptions?: FilterItemType[]
};

type DispatchProps = {
    getAvailableFilters: () => void
    onSelectedFilterRemove: (key: string, id: string) => void,
    addSelectedFilters: (selectedFilters: SelectedFilter[]) => void
};

type Props = OwnProps & StateProps & DispatchProps;

type State = {
    searchQuery: string
};

const MENU_RESPONSIVE_CONFIG = [{
    maxWidth: 980,
    wrapItems: true,
    visibleItems: 4
}, {
    maxWidth: 767,
    wrapItems: true,
    visibleItems: 3
}, {
    maxWidth: 480,
    wrapItems: true,
    visibleItems: 2
}];

export class FiltersController extends Component<Props, State> {
    componentDidMount() {
        this.props.getAvailableFilters();
    }

    filterItemRender = (data: MenuItemData, accordion: boolean = false) => {
        const {selectedFilters} = this.props;
        const checkedIdsData = selectedFilters.find(item => item.name === data.id);

        return (
            <CollapsibleHandler key={data.title} children={({isOpen, handler}) => (
                <FilterController
                    title={data.title}
                    data={data.children}
                    isOpen={isOpen}
                    showHandler={handler}
                    checkedIds={checkedIdsData ? checkedIdsData.checkedIds : []}
                    insertSelectedFilter={this.insertSelectedFilter}
                    children={(childProps: ChildrenProps) => (
                        <FilterView {...childProps} accordion={accordion}/>
                    )}
                />
            )}/>
        );
    };

    wrappedItemsRenderer = (data: MenuItemData) => {
        const content = data.children.map(
            filter => this.filterItemRender(filter, true)
        );

        return (
            <CollapsibleHandler children={
                ({isOpen, handler}) => (
                    <Dropdown
                        cssClass="wrapped-options"
                        isOpen={isOpen}
                        onClose={handler}
                        onOpen={handler}
                        caption={data.title}>
                        {content}
                        <div><Button handler={handler} caption="Close"/></div>
                    </Dropdown>
                )}
            />
        );
    };

    insertSelectedFilter = (updateData: FilterUpdateData) => {
        const {selectedFilters} = this.props;

        this.props.addSelectedFilters(insertSelectedFilter(selectedFilters, updateData));
    };

    render() {
        const {filtersOptions} = this.props;

        return (
            <div className="filter-bar">
                <div className="filter-bar__inner-wrap">
                    <div className="grid">
                        <SmartMenuComponent
                            data={filtersOptions || []}
                            menuItemRenderer={this.filterItemRender}
                            responsive={MENU_RESPONSIVE_CONFIG}
                            wrappedItemsRenderer={this.wrappedItemsRenderer}
                            wrappedItemsTitle="More Filters"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    filtersOptions: state.search.filtersOptions,
    selectedFilters: state.search.selectedFilters,
});

const mapDispatchToProps: DispatchProps = ({
    onSelectedFilterRemove: removeSelectedFilter,
    getAvailableFilters: getAvailableFilters,
    addSelectedFilters: addSelectedFilters
});

export const ConnectedFiltersController =
    connect(mapStateToProps, mapDispatchToProps)(FiltersController);