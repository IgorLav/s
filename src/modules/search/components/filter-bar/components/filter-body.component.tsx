import React, {ReactNode} from 'react';
import {Button, BTN_TYPES} from "../../../../../components/core/button";

type Props = {
    changed: boolean,
    onSave: () => void,
    onClose: () => void,
    children: ReactNode
};

export const FilterBody = (props: Props) => {
    const {children, changed, onSave, onClose} = props;

    return (
        <div className="dropdown-filter">
            <div className="dropdown-filter__body">
                {children}
            </div>

            <footer className="dropdown-filter__footer">
                <Button type={BTN_TYPES.primary} caption="Save" handler={onSave}/>

                {changed ? (
                    <Button caption="Close" handler={onClose}/>
                ) : null}
            </footer>
        </div>
    );
};

FilterBody.defaultProps = {
    changed: false
};