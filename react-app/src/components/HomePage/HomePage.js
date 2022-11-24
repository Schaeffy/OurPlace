import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import './HomePage.css'
import { getBlogs } from '../../store/blog';
import { loadUsers } from '../../store/users';
import '../images/divider.png'


const HomePage = () => {
    const sessionUser = useSelector(state => state.session.user);
    // const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs.blogs)
    const allBlogs = Object.values(blogs)
    const users = useSelector(state => state.users.users)
    const allUsers = Object.values(users)
    const [loaded, setLoaded] = useState(false);
    // console.log('uuuuuuuuuuuuuu', users)

    useEffect(() => {
        dispatch((loadUsers())).then(() => setLoaded(true))
    }, [dispatch])

    useEffect(() => {
        dispatch(getBlogs())
    }, [dispatch])
    // console.log('ooooooooooooooo', blogs)
    // console.log(allBlogs)


    return (loaded ? (
        <div className='home-page-container'>
            {!sessionUser ?

                <div className='logged-out-container'>
                    <div className='logged-out-top'>
                        <div className='logged-out-left'>
                            <div className='cool-people-container'>
                                <div className='cool-people-top'>
                                    <h4>
                                        Cool New People
                                    </h4>
                                </div>

                                <div className='cool-people-bottom'>
                                    {allUsers.map(user => {
                                        return (
                                            <div className='person' key={user.id}>
                                                <a href={`/users/${user.id}`}>{user.username}</a>
                                            </div>
                                        )
                                    })}
                                </div>

                            </div>

                            <div className='another-container'>
                                <div className='another-top'>
                                    <h4>
                                        Cool New People
                                    </h4>
                                </div>

                                <div className='another-bottom'>
                                    {allUsers.map(user => {
                                        return (
                                            <div className='person' key={user.id}>
                                                <a href={`/users/${user.id}`}>{user.username}</a>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className='another-container'>
                                <div className='another-top'>
                                    <h4>
                                        OurSpace Announcements
                                    </h4>
                                </div>

                                <div className='another-bottom'>
                                    {allUsers.map(user => {
                                        return (
                                            <div className='person' key={user.id}>
                                                <a href={`/users/${user.id}`}>{user.username}</a>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className='logged-out-right'>

                        </div>
                    </div>

                    <div className='logged-out-bottom'>
                        <div className='bot-box'>one</div>
                        <div className='bot-box'>one</div>
                        <div className='bot-box'>one</div>
                        <div className='bot-box' id='last-box'>one</div>
                    </div>
                </div>




                :

                <div className="logged-in-container">
                    <div className='logged-in-left'></div>
                    hello
                    <div className='logged-in-right'></div>
                </div>

            }

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
        </div>)


        : null


    )
}

export default HomePage
