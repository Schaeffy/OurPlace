import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import './LoginPage.css'
import ourplaceO from '../images/ourplace-o.png'


const LoginPage = () => {


    return (
        <div className='login-page-container'>
        <div className='image-container'>
            <img id='orange-logo' src={ourplaceO} alt='logo' />
        </div>
            <div className='login-wrapper'>
                {/* <div className='login-box'> */}
                    <LoginForm />
                {/* </div> */}
                <div className='welcome'></div>
            </div>
        </div>
    )
}

export default LoginPage;
