import React, {ReactNode} from 'react';
import classNames from 'classnames';
import './styles.scss';

type Props = {
    children: ReactNode,
    cssClass: string
}

const headerClassName = 'header';

export const Header = ({cssClass, children}: Props) => {
    const classes = classNames(headerClassName, cssClass);

    return (
        <header className={classes}>
            <div className="grid">
                {children}
            </div>
        </header>
    )
};

Header.defaultProps = {
    cssClass: ''
};
