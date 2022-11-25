import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import './SignUpPage.css'
import ourplaceO from '../images/ourplace-o.png'

const SignUpPage= () => {


    return (
        <div className='login-page-container'>
        <div className='image-container'>
            <img id='orange-logo-su' src={ourplaceO} alt='logo' />
        </div>
            <div className='signup-wrapper'>
                <div className='login-box'>
                    <SignUpForm />
                </div>
                <div className='welcome'></div>
            </div>
        </div>
    )
}

export default SignUpPage
