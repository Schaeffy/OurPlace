import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <form className='login-form' onSubmit={onLogin}>

        <div className='login-input'>
          <label htmlFor='email'>E-Mail: </label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className='login-input'>
          <label htmlFor='password'>Password: </label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />

          <div className='errors'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='button-container'>
            <button id='login-button' type='submit'>LOGIN</button>
            <NavLink to='/sign-up' exact={true} >
              <button id='signup-button' type='button'>SIGNUP</button>
            </NavLink>
          </div>
        </div>
      </form>
      <div className='demo-user'>
        <button id='demo-button' type='submit' onClick={() => {
          dispatch(login('tom@aa.io', 'password'));
        }}>DEMO USER</button>

      </div>

    </>
  );
};

export default LoginForm;
