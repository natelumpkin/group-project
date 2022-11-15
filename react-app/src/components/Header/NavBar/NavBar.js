import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';
import './NavBar.css'
import LoginFormModal from '../../auth/Login/LoginModal';
import SignUpFormModal from '../../auth/SignUp/SignUpModal';
import CreateFormModal from '../../CreatePost/CreatePostModal';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  console.log("SESSION USER: ", sessionUser);

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
              <i className="fa-solid fa-house" />
            </NavLink>
            <NavLink to='/home' exact={true} activeClassName='active'>
              <i className="fa-regular fa-compass" />
            </NavLink>
            <div activeClassName='active'>
              <i class="fa-solid fa-user" />

            </div>
            <div id='profile-dropdown'>
              <LogoutButton />
            </div>
            <CreateFormModal />
          </>)
        }
      </nav>
    </div>
  );
}

export default NavBar;
