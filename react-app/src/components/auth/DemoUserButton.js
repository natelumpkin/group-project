import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import './DemoUserButton.css';

const DemoUserButton = () => {
    const dispatch = useDispatch()

    const demoLogin = () => dispatch(login('demo@aa.io', 'password'))

    return <div id="demo-user-button" onClick={demoLogin}>Demo User</div>;
};

export default DemoUserButton;
