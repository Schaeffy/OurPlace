
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import ourplaceLogo from './images/ourplace3.png';
import './NavBar.css';

const NavBar = () => {
  return (

    <div className='nav-container'>

      <div className='top-nav-bar'>
        <div className='nav-left-container'>
          <div className='nav-left-image'>
            <img id='logo' src={ourplaceLogo} alt='logo' />
          </div>
        </div>

        <div className='nav-right-container'>
          <div className='nav-right-links'>
            <div className='nav-link'>
              <NavLink to='/help' exact={true} activeClassName='active'>
                Help
              </NavLink>

              <NavLink id='login' to='/login' exact={true} activeClassName='active'>
                LogIn
              </NavLink>

              <NavLink id='signup' to='/sign-up' exact={true} activeClassName='active'>
                SignUp
              </NavLink>


              <LogoutButton />
            </div>
          </div>
        </div>
      </div>


      <div className='bottom-nav-bar'>

              <NavLink to='/' exact={true} activeClassName='active'>
                Home
              </NavLink>

              <NavLink to='/users' exact={true} activeClassName='active'>
                Browse
              </NavLink>

              <NavLink to='/blogs/' exact={true} activeClassName='active'>
                Blogs
              </NavLink>


      </div>

    </div>
  );
}

export default NavBar;
