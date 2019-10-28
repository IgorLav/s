import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './layout/root/app';
import {store} from './store';

const ROOT_ELEMENT = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    ROOT_ELEMENT
);
