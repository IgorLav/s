import React, {FunctionComponent} from 'react';
import {Header} from "../header";
import {Logo} from '../../components/logo';
import {SearchPageComponent} from "../../modules/search";
import '../../assets/styles/common.scss';

const App: FunctionComponent = () => {
    return (
        <div className="app">
            <Header>
                <Logo cssClass="header__logo"/>
            </Header>

            <SearchPageComponent/>
        </div>
    );
};

export default App;
