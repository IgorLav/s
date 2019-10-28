import React, {ReactNode} from 'react';
import classNames from 'classnames';
import {MENU_CSS_CLASSES} from "./constants";

export type MenuItemData = {
    id: string,
    title: string,
    itemCssClass?: string,
    children: any[]
};

export type MenuItemProps = MenuItemData & {
    childrenRenderer?: (props: MenuItemData) => ReactNode
}

export const SmartMenuItemComponent = (props: MenuItemProps) => {
    const {childrenRenderer, ...menuItemData} = props;

    if(typeof childrenRenderer !== 'function') {
        return null;
    }

    return (
        <div className={classNames(MENU_CSS_CLASSES.menuItem)}>
            {childrenRenderer(menuItemData)}
        </div>
    );
};

SmartMenuItemComponent.defaultProps = {
    itemCssClass: ''
};
