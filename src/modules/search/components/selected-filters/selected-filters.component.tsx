import React, {Component} from "react";
import {Pills} from "../../../../components/core/pills";
import {connect} from "react-redux";
import {removeSelectedFilter} from "../../services/actions";
import {FilterItemType, SelectedFilter} from "../../services/reducers";
import {AppState} from "../../../../services/reducers";
import {preparePillsData} from "./uitil";

type StateProps = {
    selectedFilters: SelectedFilter[],
    filtersOptions?: FilterItemType[]
};

type OwnProps = {
    cssClass: string
};

type DispatchProps = {
    onSelectedFilterRemove: (key: string, id: string) => void
};

type Props = OwnProps & StateProps & DispatchProps;

const pillsLabel = <h3>Applied filters:</h3>;

export class SelectedFiltersComponent extends Component<Props> {
    onRemove = (key: string, id: string) => {
        this.props.onSelectedFilterRemove(key, id);
    };

    render() {
        const {cssClass, selectedFilters, filtersOptions} = this.props;
        return (
            <div className="grid">
                <Pills
                    cssClass={cssClass}
                    handler={this.onRemove}
                    data={preparePillsData({selectedFilters, filtersOptions})}
                    label={pillsLabel}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    selectedFilters: state.search.selectedFilters,
    filtersOptions: state.search.filtersOptions
});

const mapDispatchToProps: DispatchProps = ({
    onSelectedFilterRemove: removeSelectedFilter
});

export const ConnectedSelectedFiltersComponent =
    connect(mapStateToProps, mapDispatchToProps)(SelectedFiltersComponent);