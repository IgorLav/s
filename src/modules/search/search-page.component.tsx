import React from 'react';
import {PageComponent} from '../../components/core/page';
import {ConnectedFiltersController} from "./components/filter-bar";
import {ConnectedSelectedFiltersComponent} from './components/selected-filters';
import './styles.scss';

type Props = {};

export const SearchPageComponent = (props: Props) => {
    return (
        <PageComponent cssClass="search-page">
            <ConnectedFiltersController/>

            <ConnectedSelectedFiltersComponent cssClass="search-page__applied-filters"/>
        </PageComponent>
    );
};
