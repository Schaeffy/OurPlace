
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
              <a href='https://github.com/Schaeffy/OurPlace'>
                Help
              </a>

            {sessionUser ? <LogoutButton /> : (
              <div className='session-nav-links'>
              <NavLink id='login' to='/login' exact={true} >
                LogIn
              </NavLink>

              <NavLink id='signup' to='/sign-up' exact={true} >
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
          <NavLink id='home' to='/' exact={true}>
            Home
          </NavLink>

          <NavLink id='browse' to='/users' exact={true}>
            Browse
          </NavLink>

          <NavLink id='blogs' to='/blogs/' exact={true}>
            Blog
          </NavLink>
        </div>


      </div>

    </div>
  );
}

export default NavBar;
