import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/app';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';

const createStoreWithMiddleware =  applyMiddleware(reduxThunk,logger)(createStore);
export const store = createStoreWithMiddleware(reducer, composeWithDevTools(),  applyMiddleware(thunk));



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app'));
