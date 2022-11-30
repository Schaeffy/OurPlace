import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getBlogs, resetBlog } from '../../store/blog';
import './Blog.css'
import { loadUsers } from '../../store/users';



const Blogs = () => {
    const sessionUser = useSelector(state => state.session.user);
    // console.log(sessionUser)
    // const user = useSelector(state => state.user);
    const { userId } = useParams();
    const dispatch = useDispatch()

    const [loaded, setLoaded] = useState(false);

    const blogs = useSelector(state => state.blogs.blogs)
    const allBlogs = Object.values(blogs)

    const users = useSelector(state => state.users.users)
    const allUsers = Object.values(users)

    useEffect(() => {

        dispatch(loadUsers()).then(
        dispatch(getBlogs())).then(() => setLoaded(true))

        return () => {
            dispatch(resetBlog())
        }
    }, [dispatch])


    return (
        loaded &&(
        <div className='blogs-container'>
            <h1>Blogs</h1>

            <div id='blog-links'>
                [<NavLink  className='blog-links' to={`/users/${sessionUser.id}/blogs`} id='navlink'>View Your Blog</NavLink>]
            </div>

            <div id='blog-links'>
                [<NavLink  className='blog-links' to={`/blogs/new`} id='navlink'>Create a New Blog Entry</NavLink>]
            </div>

            {allBlogs?.reverse().map(blog => {
                return (
                    <div className='blog-entry-container' key={blog.id}>
                        <div className='blog-info'>
                            {new Date(blog.created_at).toLocaleDateString()} — by {allUsers?.map(user => user.id === blog.user_id ? <NavLink id='navlink' to={`/users/${user.id}`}>{user?.username}</NavLink> : null)}
                        </div>
                        <div className='blog-title'>{blog.blog_title}</div>
                        <div className='blog-body'>
                            {blog.blog_body.length > 400 ? blog.blog_body.slice(0, 400) + '...' : blog.blog_body} <NavLink id='navlink' to={`/blogs/${blog.id}`}>» Continue Reading</NavLink>
                            <div className='view-entry'><NavLink id='navlink' to={`/blogs/${blog.id}`}>» View Blog Entry</NavLink></div>
                        </div>
                    </div>
                )
            })}
        </div>)
    )
}

export default Blogs
