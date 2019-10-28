import React, {Component, ReactNode} from 'react';
import {Checkbox} from "../../../../../components/core/checkbox";
import {FilterItemType} from "../../../services/reducers";
import {FilterUpdateData} from "../../../services/utils";

export type ChildrenProps = {
    isOpen: boolean,
    changed: boolean,
    filterOptions: ReactNode[] | null,
    resetSelected: () => void,
    onFilterSave: () => void,
    showHandler: () => void,
    title: string,
};

type Props = {
    title: string,
    data: FilterItemType[],
    isOpen: boolean,
    checkedIds: string[],
    showHandler: () => void,
    insertSelectedFilter: (updateData: FilterUpdateData) => void,
    children: (props: ChildrenProps) => ReactNode
};

type State = {
    changed: boolean,
    checkedIds: string[],
    defaultCheckedIds: string[]
};

export class FilterController extends Component<Props, State> {
    state = {
        changed: false,
        checkedIds: this.props.checkedIds,
        defaultCheckedIds: this.props.checkedIds
    };

    static defaultProps = {
        accordion: false
    };

    componentDidUpdate() {
        const {checkedIds} = this.props;

        if (this.isFiltersChanged(checkedIds)) {
            this.setState({
                checkedIds,
                defaultCheckedIds: checkedIds,
                changed: false
            });
        }
    }

    onCheckboxChange = (id: string, checked: boolean) => {
        const {checkedIds} = this.state;
        const updatedIds = checked ?
            checkedIds.concat(id) :
            checkedIds.filter(i => i !== id);

        this.setState({
            changed: this.isFiltersChanged(updatedIds),
            checkedIds: updatedIds
        });
    };

    isChecked = (id: string) => {
        const {checkedIds} = this.state;

        return !!checkedIds.find(checkedId => checkedId === id);
    };

    isFiltersChanged = (newCheckedIds: string[]) => {
        const {defaultCheckedIds} = this.state;

        if (defaultCheckedIds.length !== newCheckedIds.length) {
            return true;
        }

        return defaultCheckedIds.some(element => !newCheckedIds.includes(element));
    };

    renderTitle = () => {
        const {title} = this.props;
        const {checkedIds} = this.state;

        return checkedIds.length > 0 ? `${title} (${checkedIds.length})` : title;
    };

    onFilterSave = () => {
        const {insertSelectedFilter, title} = this.props;
        const {checkedIds} = this.state;

        insertSelectedFilter({key: title, ids: checkedIds});
        this.props.showHandler();
    };

    resetSelected = () => {
        this.setState({
            checkedIds: this.props.checkedIds,
            changed: false
        });

        this.props.showHandler();
    };

    render() {
        const {data, children, isOpen, showHandler} = this.props;
        const {changed} = this.state;

        const filterOptions = data ? data.map(({id, title}) => (
            <Checkbox
                key={`${id}-${changed}`}
                id={id}
                label={title}
                checked={this.isChecked(id)}
                onChange={this.onCheckboxChange}
                inline={true}
                buttonLabel={true}
                cssClass="dropdown-filter__option"
            />
        )) : null;

        return children({
            isOpen,
            filterOptions,
            showHandler,
            changed,
            resetSelected: this.resetSelected,
            onFilterSave: this.onFilterSave,
            title: this.renderTitle(),
        })
    }
}