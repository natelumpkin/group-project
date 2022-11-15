import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';
import './NavBar.css'
import LoginFormModal from '../../auth/Login/LoginModal';
import SignUpFormModal from '../../auth/SignUp/SignUpModal';
import CreateFormModal from '../../CreatePost/CreatePostModal';
import { useState, useEffect } from 'react';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div id='header-links'>
      <nav>
        {!sessionUser && (
          <>
            <LoginFormModal />
            <SignUpFormModal />
          </>)
        }
        {sessionUser && (
          <>
            <NavLink to='/feed' exact={true} activeClassName='active'>
              Nav Feed
            </NavLink>
            <NavLink to='/' exact={true} activeClassName='active'>
              <i className="fa-regular fa-compass" />
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
                      <NavLink to='/users/following' exact={true} activeClassName='active' className='dropdown-option'>
                        <i class="fa-solid fa-user-plus" />
                        <p>Following</p>
                      </NavLink>
                    </div>
                  </div>
                </div>
              )}
              <CreateFormModal />
            </>)
        }
          </nav>
    </div>
  );
}

export default NavBar;
