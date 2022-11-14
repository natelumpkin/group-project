import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <div id='header-links'>
      <nav>
        {sessionUser && (
          <>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>

            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </>)
        }
        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>

        <LogoutButton />
      </nav>
    </div>
  );
}

export default NavBar;
