import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getBlogs } from '../../store/blog';
import { getOneUser } from '../../store/users';
import './UserBlog.css'
import defaultPic from '../images/user.png'



const UserBlog = () => {
    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.users.users);
    // console.log(sessionUser)
    // const user = useSelector(state => state.user);
    const { userId } = useParams();
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs.blogs)
    const allBlogs = Object.values(blogs).filter(blog => blog.user_id === +userId)
    const [loaded, setLoaded] = useState(false);

    const user = useSelector(state => state.users.user)

    useEffect(() => {
        dispatch(getOneUser(userId))
        dispatch(getBlogs()).then(() => setLoaded(true))
    }, [dispatch, userId])


    return (
        loaded &&
        <div className='user-blog-container'>
        <div className='blog-profile'>
                <div className='blog-profile-pic'>
                    <img className='blog-profile-img' src={user?.profile_img ? user?.profile_img : defaultPic} alt='' />
                </div>
                <div className='blog-profile-info'>
                    <div className='published'>
                        Published by <NavLink id='navlink' to={`/users/${user?.id}`}>{user?.username}</NavLink>
                    </div>

                    <div className='view'>
                        <NavLink id='navlink' to={`/users/${user?.id}/blogs`}>View Blog</NavLink>
                    </div>

                    <div className='view'>
                        <NavLink id='navlink' to={`/users/${user?.id}/`}>View Profile</NavLink>
                    </div>
                </div>
            </div>
            <h1>Blogs</h1>
            {allBlogs.map(blog => {
                return (
                    <div className='blog-entry-container' key={blog.id}>
                        <div className='blog-title'>{blog.blog_title}</div>
                        <div className='blog-body'>
                            {blog.blog_body.length > 400 ? blog.blog_body.slice(0, 400) + '...' : blog.blog_body} <NavLink id='navlink' to={`/blogs/${blog.id}`}>» Continue Reading</NavLink>
                            <div><NavLink id='navlink' to={`/blogs/${blog.id}`}>» View Blog Entry</NavLink></div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default UserBlog
