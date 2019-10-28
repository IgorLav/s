import React from 'react';
import classNames from 'classnames';
import './styles.scss';

type Props = {
    cssClass: string
}

const LINK_TITLE = 'i_lavs shop';

export const Logo = ({cssClass}: Props) => {
    return (
        <a href="/" className={classNames('logo', cssClass)} title={LINK_TITLE}>
            <img
                src={`${process.env.PUBLIC_URL}/images/app-logo.png`}
                width={40}
                height={46}
                alt="i_lavs e-commerce shop logo"/>
            <span className="logo__text">Lavs Shop</span>
        </a>
    )
};

Logo.defaultProps = {
    cssClass: ''
};

