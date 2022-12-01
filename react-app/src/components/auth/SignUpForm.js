import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [displayErrors, setDisplayErrors] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  let validate = () => {
    let validationErrors = [];

    if (username.length < 4) {
      validationErrors.push("Username must be at least 4 characters long");
    }
    if (username.length > 40) {
      validationErrors.push("Username must be less than 40 characters long");
    }
    if (password.length < 6) {
      validationErrors.push("Password must be at least 6 characters long");
    }
    if (password.length > 50) {
      validationErrors.push("Password must be less than 50 characters long");
    }
    if (password !== repeatPassword) {
      validationErrors.push("Passwords must match");
    }
    if (email.length < 3 || email.length > 256) {
      validationErrors.push("Email must be between 3 and 256 characters long");
    }
    if (!email.includes("@")) {
      validationErrors.push("Email must be a valid email address");
    }
    setErrors(validationErrors);

    if (validationErrors.length) setDisplayErrors(true);

    return validationErrors

  }

  useEffect(() => {
    if (displayErrors) validate();
  }, [username, email, password, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([]);
    setDisplayErrors(false);
    let validationErrors = validate();
    if (validationErrors.length) return;

    if (!errors.length) {
      if (password === repeatPassword) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          setErrors(data)
        }
      }
    }
    return errors
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
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
  console.log(errors)

  return (
    <>
      <form onSubmit={onSignUp}>
        <div className='login-input'>
          <label>User Name: </label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className='login-input'>
          <label>Email: </label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className='login-input'>
          <label>Password: </label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className='login-input'>
          <label id='repeat-pass'>Repeat Password: </label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className='errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='button-container'>
          <button id='signup-button' type='submit'>SIGNUP</button>
        </div>
      </form>


    </>



  );
};

export default SignUpForm;
