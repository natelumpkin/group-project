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

  console.log('navbar follows variable: ', follows)

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    dispatch(followActions.getAllFollowers());
    dispatch(followActions.getAllFollowing());
  }, [dispatch])

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
            <NavLink to='/feed' exact={true} activeClassName='active'>
              <i class="fa-solid fa-house" />
            </NavLink>
            <NavLink to='/' exact={true} activeClassName='active'>
              <i className="fa-regular fa-compass" />
            </NavLink>
            <div onClick={toggleMenu} activeClassName='active' id='profile-button'>
              <i class="fa-solid fa-user" />
            </div>
            {showMenu && (
              <div id='profile-dropdown-container'>
                <div id='profile-dropdown'>
                  <div id="dropdown-header">
                    <p>Account</p>
                    <LogoutButton />
                  </div>
                  <div>
                    <NavLink to={`/users/${sessionUser.id}`} exact={true} activeClassName='active' className='dropdown-option'>
                      <i class="fa-solid fa-user-large" />
                       <p>Your posts</p>
                    </NavLink>
                    <NavLink to='/following' exact={true} activeClassName='active' className='dropdown-option dropdown-followlink'>
                      <div className='dropdown-option-child'>
                        <i class="fa-solid fa-user-plus" />
                        <p>Following</p>
                      </div>
                      <div className='dropdown-option-child'>
                      <p>{numFollowing}</p>
                      </div>
                    </NavLink>
                    <NavLink to='/followers' exact={true} activeClassName='active' className='dropdown-option dropdown-followlink'>
                      <div className='dropdown-option-child'>
                        <i class="fa-solid fa-users"></i>
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
