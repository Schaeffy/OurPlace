import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getBlogs } from '../../store/blog';
import './UserBlog.css'



const UserBlog = () => {
    const sessionUser = useSelector(state => state.session.user);
    console.log(sessionUser)
    // const user = useSelector(state => state.user);
    const { userId } = useParams();
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs.blogs)
    const allBlogs = Object.values(blogs).filter(blog => blog.user_id === +userId)

    useEffect(() => {
        dispatch(getBlogs())
    }, [dispatch])


    return (
        <div className='user-blog-container'>
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
