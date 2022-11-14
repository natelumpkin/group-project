import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';
import './NavBar.css'
import LoginFormModal from '../../auth/Login/LoginModal';
import SignUpFormModal from '../../auth/SignUp/SignUpModal';
import CreateFormModal from '../../CreatePostModal/CreatePostModal';

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
            <NavLink to='/' exact={true} activeClassName='active'>
              Nav Feed
            </NavLink>
            <NavLink to='/' exact={true} activeClassName='active'>
              Explore
            </NavLink>
            <NavLink to='/' exact={true} activeClassName='active'>
              Profile
            </NavLink>
            <CreateFormModal />
            <LogoutButton />
          </>)
        }
      </nav>
    </div>
  );
}

export default NavBar;
