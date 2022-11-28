import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import './Footer.css'

const Footer = () => {
    return (
        <div className='footer'>
        <p>
            Footer
        </p>
        <ul>
            <li>
                links
            </li>
            <li>
                links
            </li>
            <li>
                links
            </li>
            <li>
                links
            </li>
            <li>
                links
            </li>

        </ul>

    </div>
    )
}

export default Footer
