import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import * as postActions from './store/post'
import * as commentActions from './store/comment'
import * as likeActions from './store/like';

const store = configureStore();

if (process.env !== 'production') {
  window.store = store;
  window.postActions = postActions;
  window.commentActions = commentActions;
  window.likeActions = likeActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
