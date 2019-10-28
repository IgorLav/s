import React from 'react';
import {Dropdown} from "../../../../../components/core/dropdown";
import {Accordion} from "../../../../../components/core/accordion";
import {FilterBody} from "./filter-body.component";
import {ChildrenProps} from "./filter.controller";


type Props = ChildrenProps & {
    accordion: boolean
};

export const FilterView = (props: Props) => {
    const {
        title,
        accordion,
        filterOptions,
        isOpen,
        resetSelected,
        onFilterSave,
        changed,
        showHandler
    } = props;

    const filterBody = (
        <FilterBody
            changed={changed}
            onClose={resetSelected}
            onSave={onFilterSave}>
            {filterOptions}
        </FilterBody>
    );

    if (accordion) {
        return (
            <Accordion title={title} isOpen={isOpen} handler={showHandler}>
                {filterBody}
            </Accordion>
        );
    }

    return (
        <Dropdown
            caption={title}
            onClose={resetSelected}
            onOpen={() => showHandler()}
            isOpen={isOpen}>
            {filterBody}
        </Dropdown>
    );
};

FilterView.defaultProps = {
    isOpen: false,
    accordion: false
};
