import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from './context/Modal';
import './index.css';
import App from './App';
import configureStore from './store';
import * as postActions from './store/post'
import * as sessionActions from './store/session'
import * as commentActions from './store/comment'
import * as likeActions from './store/like';
import * as followActions from './store/follow'

const store = configureStore();

if (process.env !== 'production') {
  window.store = store;
  window.postActions = postActions;
  window.commentActions = commentActions;
  window.likeActions = likeActions;
  window.followActions = followActions;
  window.sessionActions = sessionActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode >,
  document.getElementById('root')
);
