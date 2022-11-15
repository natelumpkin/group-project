import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/Login/LoginForm';
import SignUpForm from './components/auth/SignUp/SignUpForm';
import Header from './components/Header';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/Header/UsersList';
import User from './components/Header/User';
import { authenticate } from './store/session';

import AllPosts from './components/AllPosts';
import DummyPosts from './components/DummyPosts';
import HomeFeed from './components/HomeFeed';
import UserPosts from './components/UserPosts';
import './index.css'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <div id='app-container'>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
          <Route path='/home' >
            <AllPosts />
          </Route>
          <Route path='/feed'>
            <HomeFeed />
          </Route>
          <Route path='/users/:userId'>
            <User />
            <UserPosts />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>

  );
}

export default App;
