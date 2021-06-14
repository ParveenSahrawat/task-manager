import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import './App.css';

// const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    // <Provider>
        <App />
    // </Provider>
    ,
    document.querySelector('#root'));