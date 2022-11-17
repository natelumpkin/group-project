import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';
import './NavBar.css'
import LoginFormModal from '../../auth/Login/LoginModal';
import SignUpFormModal from '../../auth/SignUp/SignUpModal';
import CreateFormModal from '../../CreatePost/CreatePostModal';
import DemoUserButton from '../../auth/DemoUserButton';
import { useState, useEffect } from 'react';

import * as followActions from '../../../store/follow'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const follows = useSelector(state => state.follows)

  const dispatch = useDispatch()

  // console.log('navbar follows variable: ', follows)

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    dispatch(followActions.getAllFollowers(sessionUser?.id));
    dispatch(followActions.getAllFollowing(sessionUser?.id));
  }, [dispatch, sessionUser])

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const numFollowers = Object.keys(follows.followers).length
  const numFollowing = Object.keys(follows.following).length

  return (
    <div id='header-links'>
      <nav>
        {!sessionUser && (
          <div id='auth-buttons'>
            <DemoUserButton />
            <LoginFormModal />
            <SignUpFormModal />
          </div>)
        }
        {sessionUser && (
          <div id='session-buttons'>
            <NavLink to='/feed' exact={true}>
              <i className="fa-solid fa-house" />
            </NavLink>
            <NavLink to='/' exact={true}>
              <i className="fa-regular fa-compass" />
            </NavLink>
            <div onClick={toggleMenu} id='profile-button'>
              <i className="fa-solid fa-user" />
            </div>
            {showMenu && (
              <div id='profile-dropdown-container'>
                <div id='profile-dropdown'>
                  <div id="dropdown-header">
                    <p>Account</p>
                    <LogoutButton />
                  </div>
                  <div>
                    <NavLink to={`/users/${sessionUser.id}`} exact={true} className='dropdown-option'>
                      <i className="fa-solid fa-user-large" />
                      <p>Your posts</p>
                    </NavLink>
                    <NavLink to='/following' exact={true} className='dropdown-option dropdown-followlink'>
                      <div className='dropdown-option-child'>
                        <div id='follow-icon'>
                          <i className="fa-solid fa-user-plus" />
                        </div>
                        <p>Following</p>
                      </div>
                      <div className='dropdown-option-child'>
                        <p>{numFollowing}</p>
                      </div>
                    </NavLink>
                    <NavLink to='/followers' exact={true} className='dropdown-option dropdown-followlink'>
                      <div className='dropdown-option-child'>
                        <div id='follow-icon'>
                          <i className="fa-solid fa-users"></i>
                        </div>
                        <p>Followers</p>
                      </div>
                      <div className='dropdown-option-child'>
                        <p>{numFollowers}</p>
                      </div>
                    </NavLink>

                  </div>
                </div>
              </div>
            )}
            <CreateFormModal />
          </div>)
        }
      </nav>
    </div>
  );
}

export default NavBar;
