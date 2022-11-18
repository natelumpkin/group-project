import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import './index.css'

const Header = () => {
    return (
        <div id='header-container'>
            <div id='header'>
                <div className='header-left'>
                    <NavLink to='/' exact={true} >
                        <img src="https://i.imgur.com/twMKSWE.png" alt="scuttlr-logo" />
                    </NavLink>
                </div>
                <NavBar />
            </div>
        </div>
    )
}

export default Header
