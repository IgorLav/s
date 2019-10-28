import React, {ReactNode} from 'react';
import classNames from 'classnames';

type Props = {
    cssClass: string,
    children: ReactNode
};

const pageClassName = 'page';

export const PageComponent = ({children, cssClass}: Props) => {
    return (
        <div className={classNames(pageClassName, cssClass)}>
            {children}
        </div>
    )
};

PageComponent.defaultProps = {
    cssClass: ''
};
