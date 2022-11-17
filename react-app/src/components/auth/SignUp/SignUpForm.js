import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';

const SignUpForm = ({ setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profileImageInput, setProfileImageInput] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstNameCharCount, setFirstNameCharCount] = useState(0);
  const [lastNameCharCount, setLastNameCharCount] = useState(0);
  const [usernameCharCount, setUsernameCharCount] = useState(0);
  const [emailCharCount, setEmailCharCount] = useState(0);
  const [profileImageInputCharCount, setProfileImageInputCharCount] = useState(0);
  const [passwordCharCount, setPasswordCharCount] = useState(0);
  const [repeatPasswordCharCount, setRepeatPasswordCharCount] = useState(0);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const defaultProfileImage = "https://img.freepik.com/premium-vector/handdrawn-vintage-hermit-crab-vector-illustration_147266-58.jpg?w=360";

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      let profileImageUrl = defaultProfileImage;
      if (profileImageInput) profileImageUrl = profileImageInput;

      const data = await dispatch(signUp(firstName, lastName, username, email, profileImageUrl, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Password and confirm password must match'])
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
    setFirstNameCharCount(e.target.value.length)
  }

  const updateLastName = (e) => {
    setLastName(e.target.value);
    setLastNameCharCount(e.target.value.length)
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
    setUsernameCharCount(e.target.value.length)
  };

  const updateProfileImageInput = (e) => {
    setProfileImageInput(e.target.value)
    setProfileImageInputCharCount(e.target.value.length)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
    setEmailCharCount(e.target.value.length)
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    setPasswordCharCount(e.target.value.length)
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
    setRepeatPasswordCharCount(e.target.value.length)
  };


  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form id='signup-form' onSubmit={onSignUp}>
      <div id='auth-site-name'>scuttlr</div>
      <div id='auth-input-fields'>
        <div className='signup-input-container'>
          <input
            type='text'
            name='firstName'
            placeholder='First Name'
            onChange={updateFirstName}
            value={firstName}
            required
            maxLength={40}
          ></input>
          <div className='char-count'>{firstNameCharCount}/40</div>
        </div>
        {errors.firstName && <div>
          <p>{errors.firstName}</p>
        </div>}
        <div className='signup-input-container'>
          <input
            type='text'
            name='lastName'
            placeholder='Last Name'
            onChange={updateLastName}
            value={lastName}
            required
            maxLength={40}
          ></input>
          <div className='char-count'>{lastNameCharCount}/40</div>
        </div>
        {errors.lastName && <div>
          <p>{errors.firstName}</p>
        </div>}
        <div className='signup-input-container'>
          <input
            type='text'
            name='username'
            placeholder='Username'
            onChange={updateUsername}
            value={username}
            required
            maxLength={40}
          ></input>
          <div className='char-count'>{usernameCharCount}/40</div>
        </div>
        {errors.username && <div>
          <p>{errors.username}</p>
        </div>}
        <div className='signup-input-container'>
          <input
            type='text'
            name='email'
            placeholder='Email'
            onChange={updateEmail}
            value={email}
            required
            maxLength={100}
          ></input>
          <div className='char-count'>{emailCharCount}/100</div>
        </div>
        {errors.email && <div>
          <p>{errors.email}</p>
        </div>}
        <div className='signup-input-container'>
          <input
            type='url'
            name='profileImageInput'
            placeholder='Profile Image URL'
            onChange={updateProfileImageInput}
            value={profileImageInput}
            maxLength={255}
          ></input>
          <div className='char-count'>{profileImageInputCharCount}/255</div>
        </div>
        {errors.profileImageUrl && <div>
          <p>{errors.profileImageUrl}</p>
        </div>}
        <div className='signup-input-container'>
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={updatePassword}
            value={password}
            required
            maxLength={40}
          ></input>
          <div className='char-count'>{passwordCharCount}/40</div>
        </div>
        {errors.password && <div>
          <p>{errors.password}</p>
        </div>}
        <div className='signup-input-container'>
          <input
            id='confirm-password-input'
            type='password'
            name='repeat_password'
            placeholder='Confirm Password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            maxLength={40}
          ></input>
          <div className='char-count'>{repeatPasswordCharCount}/40</div>
        </div>
      </div>
      <div className='auth-footer'>
        <button className='auth-cancel-button' onClick={() => setShowModal(false)}>Close</button>
        <button className='signup-button' type="submit">Sign Up</button>
      </div>
      {errors.length > 0 && (
        <div id='signup-errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>)}
    </form>
  );
};

export default SignUpForm;
