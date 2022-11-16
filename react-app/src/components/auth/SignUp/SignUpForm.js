import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';

const SignUpForm = () => {
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
        console.log('errors from signup form: ', data)
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

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateProfileImageInput = (e) => {
    setProfileImageInput(e.target.value);
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
    <form onSubmit={onSignUp}>
      <div>
        <label>First Name</label>
        <input
          type='text'
          name='firstName'
          onChange={updateFirstName}
          value={firstName}
        ></input>
      </div>
      {errors.firstName && <div>
        <p>{errors.firstName}</p>
      </div>}
      <div>
        <label>Last Name</label>
        <input
          type='text'
          name='lastName'
          onChange={updateLastName}
          value={lastName}
        ></input>
      </div>
      {errors.lastName && <div>
        <p>{errors.firstName}</p>
      </div>}
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      {errors.username && <div>
        <p>{errors.username}</p>
      </div>}
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      {errors.email && <div>
        <p>{errors.email}</p>
      </div>}
      <div>
        <label>Profile Image</label>
        <input
          type='url'
          name='profileImageInput'
          onChange={updateProfileImageInput}
          value={profileImageInput}
        ></input>
      </div>
      {errors.profileImageUrl && <div>
        <p>{errors.profileImageUrl}</p>
      </div>}
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
        {errors.password && <div>
          <p>{errors.password}</p>
        </div>}
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
      <div>
        {/* {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))} */}
      </div>
    </form>
  );
};

export default SignUpForm;
