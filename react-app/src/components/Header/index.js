import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar';
import './index.css'

const Header = () => {
    return (
        <div id='header'>
            <NavLink to='/' exact={true} activeClassName='active'>
                Home
            </NavLink>
            <NavBar />
        </div>
    )
}

export default Header
