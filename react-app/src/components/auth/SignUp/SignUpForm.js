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
        // console.log('errors from signup form: ', data)
        setErrors(data)
      }
    } else {
      setErrors(['Password and confirm password must match'])
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  }

  const updateLastName = (e) => {
    setLastName(e.target.value);
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateProfileImage = (e) => {
    setProfileImage(e.target.value)
    // console.log('profile image: ', profileImage)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
    // console.log('email: ', email)
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };


  if (user) {
    return <Redirect to='/' />;
  }

  // console.log(errors)

  return (
    <form id='signup-form' onSubmit={onSignUp}>
      <div id='auth-site-name'>scuttlr</div>
      <div id='auth-input-fields'>
        <div>
          <input
            type='text'
            name='firstName'
            placeholder='First Name'
            onChange={updateFirstName}
            value={firstName}
            required
          ></input>
        </div>
        {errors.firstName && <div>
          <p>{errors.firstName}</p>
        </div>}
        <div>
          <input
            type='text'
            name='lastName'
            placeholder='Last Name'
            onChange={updateLastName}
            value={lastName}
            required
          ></input>
        </div>
        {errors.lastName && <div>
          <p>{errors.firstName}</p>
        </div>}
        <div>
          <input
            type='text'
            name='username'
            placeholder='Username'
            onChange={updateUsername}
            value={username}
            required
          ></input>
        </div>
        {errors.username && <div>
          <p>{errors.username}</p>
        </div>}
        <div>
          <input
            type='text'
            name='email'
            placeholder='Email'
            onChange={updateEmail}
            value={email}
            required
          ></input>
        </div>
        {errors.email && <div>
          <p>{errors.email}</p>
        </div>}
        <div>
        <input
          type='url'
          name='profileImageInput'
          placeholder='Profile Image'
          onChange={updateProfileImageInput}
          value={profileImageInput}
        ></input>
      </div>
      {errors.profileImageUrl && <div>
        <p>{errors.profileImageUrl}</p>
      </div>}
      <div>
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={updatePassword}
            value={password}
            required
          ></input>
          {errors.password && <div>
            <p>{errors.password}</p>
          </div>}
        </div>
        <div>
          <input
            id='confirm-password-input'
            type='password'
            name='repeat_password'
            placeholder='Confirm Password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
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
