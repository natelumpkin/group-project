import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import './index.css'

const Header = () => {
    return (
        <div id='header'>
            <NavLink to='/' exact={true} activeClassName='active'>
                Logo Feed
            </NavLink>
            <NavBar />
        </div>
    )
}

export default Header
