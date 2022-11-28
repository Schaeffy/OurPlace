import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getBlogs, getOneBlog } from '../../store/blog';
import './BlogEntry.css'
import { loadUsers } from '../../store/users';
import defaultPic from '../images/user.png'



const BlogEntry = () => {
    // const sessionUser = useSelector(state => state.session.user);
    const { blogId } = useParams()
    const [loaded, setLoaded] = useState(false);
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch()
    const blog = useSelector(state => state.blogs.singleBlog)
    const blogUser = Object.values(users).filter(user => user.id === blog.user_id)[0]
    console.log('blogUser', blogUser)
    // const allBlogs = Object.values(blogs)

    useEffect(() => {
        dispatch(loadUsers())
        dispatch(getOneBlog(blogId)).then(() => setLoaded(true))
    }, [dispatch, blogId])


    return (loaded &&
        <div className='blog-container'>
            <div className='blog-profile'>
                <div className='blog-profile-pic'>
                    <img className='blog-profile-img' src={blogUser.profile_img ? blogUser.profile_img : defaultPic} alt='' />
                </div>
                <div className='blog-profile-info'>
                    <div className='published'>
                        Published by <NavLink id='navlink' to={`/users/${blogUser.id}`}>{blogUser.username}</NavLink>
                    </div>
                    <div className='published-date'>
                        Published: {new Date(blog.created_at).toLocaleDateString()}
                    </div>
                    <div className='published-date'>
                        Updated: {blog.updated_at ? new Date(blog.updated_at).toLocaleDateString() : null}
                    </div>

                    <div className='view'>
                        <NavLink id='navlink' to={`/users/${blogUser.id}/blogs`}>View Blog</NavLink>
                    </div>

                    <div className='view'>
                        <NavLink id='navlink' to={`/users/${blogUser.id}/`}>View Profile</NavLink>
                    </div>
                </div>
            </div>
            <div className='blog-entry'>
                <div className='blog-entry-title'>{blog.blog_title}</div>
                <div className='blog-entry-body'>{blog.blog_body}</div>
            </div>
        </div>
    )
}

export default BlogEntry