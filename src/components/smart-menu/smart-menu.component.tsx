import React, {Component, ReactNode} from 'react';
import classNames from 'classnames';
import {MENU_CSS_CLASSES} from './constants';
import {SmartMenuItemComponent, MenuItemProps, MenuItemData} from './smart-menu-item.component';
import "./styles.scss";

type ResponsiveConfig = {
    maxWidth: number,
    wrapItems: boolean,
    visibleItems: number
}

type Props = {
    data: MenuItemProps[],
    cssClass: string,
    menuItemRenderer?: (data: MenuItemData) => ReactNode,
    wrappedItemsRenderer?: (data: MenuItemData) => ReactNode,
    wrappedItemsTitle: string,
    responsive: ResponsiveConfig[]
};

type State = {
    windowWidth: number
};

const TIMEOUT_DELAY = 150;

export class SmartMenuComponent extends Component<Props, State> {
    resizeTimer: number = 0;

    state = {
        windowWidth: window.innerWidth,
        responsive: this.props.responsive.sort((a, b) => {
            return a.maxWidth < b.maxWidth ? -1 : 1;
        })
    };

    static defaultProps = {
        cssClass: '',
        responsive: [],
        wrappedItemsTitle: 'Other'
    };

    componentDidMount() {
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.onResize)
    };

    onResize = () => {
        window.clearTimeout(this.resizeTimer);

        this.resizeTimer = window.setTimeout(() => {
            this.setState({windowWidth: window.innerWidth})
        }, TIMEOUT_DELAY);
    };

    prepareMenuItems = () => {
        const {data} = this.props;
        const {responsive, windowWidth} = this.state;

        if (responsive.length !== 0) {
            const matchedBreakpoint = this.getMatchedBreakpoint(responsive, windowWidth);

            if (matchedBreakpoint && matchedBreakpoint.wrapItems) {
                const visibleItems = data.slice(0, matchedBreakpoint.visibleItems);
                const wrappedItems = data.slice(matchedBreakpoint.visibleItems, data.length);

                return (
                    <>
                        {this.mapVisibleItems(visibleItems)}
                        {this.mapWrappedItems(wrappedItems)}
                    </>
                );
            }
        }

        return this.mapVisibleItems(data);
    };

    mapVisibleItems = (data: MenuItemProps[]) => {
        const {menuItemRenderer} = this.props;

        return data.map(itemData => (
                <SmartMenuItemComponent
                    {...itemData}
                    key={itemData.id}
                    childrenRenderer={menuItemRenderer}
                />
            )
        );
    };

    getMatchedBreakpoint = (responsive: ResponsiveConfig[], windowWidth: number) => {
        return responsive.find(item => windowWidth <= item.maxWidth);
    };

    mapWrappedItems = (wrappedItems: MenuItemProps[]) => {
        const {wrappedItemsRenderer, wrappedItemsTitle} = this.props;
        if (wrappedItems.length === 0) {
            return null;
        }

        return (
            <SmartMenuItemComponent
                id={wrappedItemsTitle}
                title={wrappedItemsTitle}
                key="wrapped options"
                childrenRenderer={wrappedItemsRenderer}
                children={wrappedItems}
            />
        );
    };

    render() {
        const {cssClass} = this.props;
        const {responsive, windowWidth} = this.state;

        return (
            <nav className={classNames(MENU_CSS_CLASSES.menu, cssClass, {
                [MENU_CSS_CLASSES.menuWrapped]: this.getMatchedBreakpoint(responsive, windowWidth)
            })}>
                <div className={MENU_CSS_CLASSES.menuList}>
                    {this.prepareMenuItems()}
                </div>
            </nav>
        );
    }
}
