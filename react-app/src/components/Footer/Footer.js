import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-links'>
                <NavLink to='/about' id='navlink'>About</NavLink> |
                <a href='https://github.com/schaeffy' id='navlink'>Github</a>
            </div>
            <div>
                ©2022 OurPlace.com. A Nostalgia Time Machine. All rights reserved.
            </div>

        </div>
    )
}

export default Footer
