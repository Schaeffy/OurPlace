import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getBlogs } from '../../store/blog';



const Blogs = () => {
    const sessionUser = useSelector(state => state.session.user);
    console.log(sessionUser)
    // const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs.blogs)
    const allBlogs = Object.values(blogs)

    useEffect(() => {
        dispatch(getBlogs())
    },[dispatch])
    console.log('ooooooooooooooo',blogs)

    return (
        <div>
            {allBlogs.map(blog => {
                return (
                    <div key={blog.id}>
                        <h1>{blog.blog_title}</h1>
                        <h2>{blog.blog_body}</h2>
                    </div>
                )
            })}
        </div>
    )
}

export default Blogs
