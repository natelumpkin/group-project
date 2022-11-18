import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';

const LoginForm = ({ setShowModal, showModal }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailCharCount, setEmailCharCount] = useState(0)
  const [passwordCharCount, setPasswordCharCount] = useState(0)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
      setShowModal(false)
    }
  }, [showModal, setShowModal])

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      let errors = []
      let errorsProperties = Object.values(data)
      let errorsKeys = Object.keys(data)
      for (let i = 0; i < errorsKeys.length; i++) {
        errors.push(errorsKeys[i] + ': ' + errorsProperties[i])
      }
      setErrors(errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
    setEmailCharCount(e.target.value.length)
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    setPasswordCharCount(e.target.value.length)
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form id='login-form' onSubmit={onLogin}>
      <div id='auth-site-name'>scuttlr</div>
      <div id='input-container'>
        <div className='signup-input-container' id='login-email-input'>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            required
            maxLength={100}
          />
          <div className='char-count'>{emailCharCount}/100</div>
        </div>
        <div className='signup-input-container' id='login-password-input'>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            required
            maxLength={40}
          />
          <div className='char-count'>{passwordCharCount}/40</div>
        </div>
      </div>
      <div className='auth-footer'>
        <button className='cancel-button' type="button" onClick={() => setShowModal(false)}>Close</button>
        <button className='save-edit-button' type="submit">Log In</button>
      </div>
      {errors.length > 0 && (
        <div id='login-errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>)}
    </form>
  );
};

export default LoginForm;
