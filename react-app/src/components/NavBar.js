
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import ourplaceLogo from './images/ourplace3.png';
import './NavBar.css';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  return (

    <div className='nav-container'>

      <div className='top-nav-bar'>
        <div className='nav-left-container'>
          <div className='nav-left-image'>
          <NavLink to={'/'} exact={true}>
            <img id='logo' src={ourplaceLogo} alt='logo' />
          </NavLink>
          </div>
        </div>

        <div className='nav-right-container'>
          <div className='nav-right-links'>
            <div className='nav-link'>
              <NavLink to='/help' exact={true} activeClassName='active'>
                Help
              </NavLink>

            {sessionUser ? <LogoutButton /> : (
              <div className='session-nav-links'>
              <NavLink id='login' to='/login' exact={true} activeClassName='active'>
                LogIn
              </NavLink>

              <NavLink id='signup' to='/sign-up' exact={true} activeClassName='active'>
                SignUp
              </NavLink>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>


      <div className='bottom-nav-bar'>

        <div className='nav-link' id='bot-nav-link'>
          <NavLink id='home' to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>

          <NavLink id='browse' to='/users' exact={true} activeClassName='active'>
            Browse
          </NavLink>

          <NavLink id='blogs' to='/blogs/' exact={true} activeClassName='active'>
            Blog
          </NavLink>
        </div>


      </div>

    </div>
  );
}

export default NavBar;
