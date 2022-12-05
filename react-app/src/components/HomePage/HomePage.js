import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import './HomePage.css'
import { getBlogs, resetBlog } from '../../store/blog';
import { loadUsers, getOneUser, resetUser } from '../../store/users';
import '../images/divider.png'
import LoginForm from '../auth/LoginForm';
import defaultPic from '../images/user.png'
import { getComments, resetComment } from '../../store/comments';
import { resetSession } from '../../store/session';
import catThumb from '../images/cat-thumbs.png'


const HomePage = () => {
    const sessionUser = useSelector(state => state.session.user);

    const user = useSelector(state => state.users.user);

    // const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs.blogs)
    const allBlogs = Object.values(blogs)
    const userBlogs = Object.values(blogs).filter(blog => blog?.user_id === sessionUser?.id)
    const users = useSelector(state => state.users.users)
    const comments = useSelector(state => state.comments.comments)
    const userComments = Object.values(comments).filter(comment => comment?.commented === sessionUser?.id)
    const allUsers = Object.values(users)
    const [loaded, setLoaded] = useState(false);
    // console.log('uuuuuuuuuuuuuu', users)

    useEffect(() => {
        dispatch(getOneUser(sessionUser?.id))
        dispatch(getBlogs())
        dispatch(loadUsers()).then(() => setLoaded(true))
        // dispatch(getComments()).then(() => setLoaded(true))

        return () => {
            dispatch(resetUser())
            dispatch(resetBlog())
            // dispatch(resetComment())
        }
    }, [dispatch, sessionUser])


    // useEffect(()=> {
    //     dispatch(getBlogs()).then(() => setLoaded(true))
    // },[dispatch])

    // useEffect(() => {
    //     dispatch(getComments()).then(() => setLoaded(true))
    // }, [dispatch])
    // useEffect(()=> {
    //     dispatch(getOneUser(sessionUser?.id)).then(() => setLoaded(true))
    // },[dispatch, sessionUser?.id])

    // console.log('ooooooooooooooo', blogs)
    // console.log(allBlogs)


    return (loaded ? (
        <div className='home-page-container'>
            {loaded && !sessionUser ?

                <div className='logged-out-container'>
                    <div className='logged-out-top'>
                        <div className='logged-out-left'>
                            <div className='cool-people-container'>
                                <div className='cool-people-top'>
                                    <h4 id='box-title'>
                                        Cool New People
                                    </h4>
                                </div>

                                <div className='friends-bot'>
                                    {allUsers?.reverse().slice(0, 4)?.map(user =>
                                        <div key={user.id}>
                                            <div key={user.id} className='profile-friend-card'>
                                                <div>
                                                    <NavLink className='cool-username' id='navlink' to={`/users/${user.id}`}>
                                                        <div>
                                                            {user?.username}
                                                        </div>
                                                        <img id='profile-friend-pic' src={user?.profile_img ? user?.profile_img : defaultPic} alt='profile-pic' />
                                                    </NavLink>
                                                </div>
                                                {/* <div>
                                                <img id='profile-friend-pic' src={user.profile_img ? user.profile_img : defaultPic} alt='profile-pic' />
                                            </div> */}
                                            </div>
                                        </div>)}
                                </div>

                            </div>

                            {/* <div className='another-container'>
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
                            </div> */}

                            <div className='another-container'>
                                <div className='another-top'>
                                    <h4 id='box-title'>
                                        OurSpace Announcements
                                    </h4>
                                </div>

                                <div className='another-bottom'>
                                    <img id='cat-thumb' src={catThumb} alt='cat-thumb' />
                                    <div className='announcement-message'>
                                        Hey! Thanks for visiting my site! <br />
                                        <span style={{ fontWeight: 'bold', color:'#1E40AF' }}>OurPlace</span> is a nostalgia fueled social networking site that I built using an assortment of tools such as React, Redux, Flask, etc. I hope you enjoy it!
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='logged-out-right'>
                            <div className='login-container'>
                                <h4>Member Login</h4>
                                <div className='home-login'>
                                    <LoginForm />
                                </div>
                                <div className='welcome'></div>
                            </div>

                        </div>
                    </div>

                    <div className='logged-out-bottom'>
                        <div className='bot-box'>
                            <div id='bot-box-title'>Nostalgia Timemachine!</div>
                            <div id='bot-box-body'>
                                Explore how social networking sites looked and felt like in the early 2000s.
                            </div>
                        </div>

                        <div className='bot-box'>
                            <div id='bot-box-title'>Get Started on OurPlace!</div>
                            <div id='bot-box-body'>
                                Join for free, create your profile, start a blog, and much more!
                            </div>
                        </div>

                        <div className='bot-box'>
                            <div id='bot-box-title'>Your Space is Your Own!</div>
                            <div id='bot-box-body'>
                                No trackers, no algorithms, no ads. Just you and your friends.
                            </div>
                        </div>

                        <div className='bot-box' id='last-box'>
                            <div id='bot-box-title'>More Features to Come</div>
                            <div id='bot-box-body'>
                                OurPlace is being continually updated and developed. Many more features are on the way!
                            </div>
                        </div>
                    </div>
                </div>




                :

                loaded && <div className='profile-page-container'>

                    <div className='profile-page-left'>
                        <div className='profile-page-left-top'>
                            <div className='name'>
                                <h2>Hello, {user.username}!</h2>
                            </div>

                            <div className='home-general'>
                                <div className='profile-pic'>
                                    <img id='profile-pic' src={user.profile_img ? user.profile_img : defaultPic} alt='profile-pic' />
                                </div>
                                <div className='general-info'>
                                    <div className='profile-edits'>
                                        <NavLink to={`/users/${user.id}/edit`} id='navlink'>Edit Profile</NavLink>
                                    </div>
                                    <div className='profile-edits'>
                                        <NavLink to={`/users/${user.id}/edit-status`} id='navlink'>Edit Status</NavLink>
                                    </div>
                                    <div className='profile-edits'>
                                        <NavLink to={`/users/${user.id}/edit-links`} id='navlink'>Edit Links</NavLink>
                                    </div>
                                    <div className='profile-edits'>
                                        <NavLink to={`/users/${user.id}/edit-photo`} id='navlink'>Add/Edit Photo</NavLink>
                                    </div>
                                    <div className='profile-edits'>
                                        <NavLink to={`/users/${user.id}/blogs`} id='navlink'>Manage Blog</NavLink>
                                    </div>
                                </div>
                            </div>

                            <div className='home-mood'>
                                <div className='view-my'>
                                    <span>View My: </span>
                                    <NavLink to={`/users/${user.id}`} id='navlink'>Profile</NavLink> | <NavLink to={`/users/${user.id}/blogs`} id='navlink'>Blogs</NavLink> | <NavLink to={`/users/${user.id}/comments`} id='navlink'>Comments</NavLink>
                                </div>
                                <div className='my-url'>
                                    {/* <span>My URL: </span> */}
                                    {/* <NavLink to={`/users/${user.id}`} id='navlink'>{`https://ourplace.com/users/${user.id}`}</NavLink> */}
                                </div>
                            </div>

                        </div>

                        {/* <div className='contact'>
                            <div className='contact-top'>
                                {`Contacting ${user.username}`}
                            </div>
                            <div className='contact-bot'>
                                <div>Some stuff</div>
                                <div>Some stuff</div>
                                <div>Some stuff</div>
                                <div>Some stuff</div>
                            </div>
                        </div> */}

                        <div className='url-container'>
                            <p id='profile-url'>OurPlace URL:</p>
                            <p>{`https://ourplace.com/users/${user.id}`}</p>
                        </div>

                        {/* <div className='interests'>

                            <div className='interests-top'>
                                {`${user.username}'s Interests`}
                            </div>

                            <div className='interests-bot'>

                                <div className='general-interests'>
                                    <div className='general-interests-left'>General</div>
                                    <div className='general-interests-right'>{user.general} </div>
                                </div>

                                <div className='general-interests'>
                                    <div className='general-interests-left'>Movies</div>
                                    <div className='general-interests-right'> {user.movies} </div>
                                </div>

                                <div className='general-interests'>
                                    <div className='general-interests-left'>Music</div>
                                    <div className='general-interests-right'> {user.music} </div>
                                </div>

                                <div className='general-interests'>
                                    <div className='general-interests-left'>Television</div>
                                    <div className='general-interests-right'> lorum ipsum </div>
                                </div>

                                <div className='general-interests'>
                                    <div className='general-interests-left'>Books</div>
                                    <div className='general-interests-right'> lorum ipsum </div>
                                </div>

                                <div className='general-interests'>
                                    <div className='general-interests-left' id='very-bot'>Heroes</div>
                                    <div className='general-interests-right' id='very-bot'> lorum ipsum </div>

                                </div>

                            </div>

                        </div> */}

                        {/* <div className='interests'>

                            <div className='interests-top'>
                                {`${user.username}'s Links`}
                            </div>

                            <div className='interests-bot'>

                                <div className='general-interests'>
                                    <div className='general-interests-left'>Instagram</div>
                                    <div className='general-interests-right'> lorum ipsum </div>
                                </div>

                                <div className='general-interests'>
                                    <div className='general-interests-left'>Snapchat</div>
                                    <div className='general-interests-right'> lorum ipsum </div>
                                </div>

                                <div className='general-interests'>
                                    <div className='general-interests-left'>Twitter</div>
                                    <div className='general-interests-right'> lorum ipsum </div>
                                </div>

                                <div className='general-interests'>
                                    <div className='general-interests-left'>Youtube</div>
                                    <div className='general-interests-right'> lorum ipsum </div>
                                </div>

                                <div className='general-interests'>
                                    <div className='general-interests-left'>Twitch</div>
                                    <div className='general-interests-right'> lorum ipsum </div>
                                </div>

                                <div className='general-interests'>
                                    <div className='general-interests-left'>TickTok</div>
                                    <div className='general-interests-right'> lorum ipsum </div>
                                </div>

                                <div className='general-interests'>
                                    <div className='general-interests-left'>Soundcloud</div>
                                    <div className='general-interests-right'> lorum ipsum </div>
                                </div>

                                <div className='general-interests'>
                                    <div className='general-interests-left'>Spotify</div>
                                    <div className='general-interests-right'> lorum ipsum </div>
                                </div>

                                <div className='general-interests'>
                                    <div className='general-interests-left'>Pintrest</div>
                                    <div className='general-interests-right'> lorum ipsum </div>
                                </div>

                                <div className='general-interests'>
                                    <div className='general-interests-left' id='very-bot'>Github</div>
                                    <div className='general-interests-right' id='very-bot'> lorum ipsum </div>
                                </div>

                            </div>

                        </div> */}

                    </div>

                    <div className='profile-page-right'>
                        <div className='profile-blog'>
                            <div>
                                <span className='latest-blog'>Your Latest Blog Entries</span> [<NavLink to={`/blogs/new`} id='navlink'><span id='view-more'>New Entry</span></NavLink>]
                            </div>
                            {userBlogs.reverse().slice(0, 5).map((blog) => (
                                <div className='blog-entry-link' key={blog.id}>
                                    {blog.blog_title} ({<NavLink id='navlink' to={`/blogs/${blog.id}`}><span id='view-more'>{`view more`}</span></NavLink>})
                                </div>
                            ))}

                            <div className='blog-entries-link'>
                                [<NavLink id='navlink' to={`/users/${user.id}/blogs`}><span id='view-more'>View all blog entries</span></NavLink>]
                            </div>
                        </div>

                        {/* <div className='profile-blurbs'>
                            <div className='blurbs-top'>
                                {`${user.username}'s Blurbs`}
                            </div>

                            <div className='blurbs-bot'>
                                <div className='section'>
                                    <h4>About me:</h4>
                                </div>

                                <div className='section'>
                                    <h4>Who I'd like to meet:</h4>
                                </div>
                            </div>
                        </div> */}

                        <div className='profile-friends'>
                            <div className='friends-top' id='friends-bot'>
                                Cool New People
                            </div>

                            <div className='friends-bot' id='friends-bot'>
                                {allUsers.reverse().slice(0, 4)?.map(user =>
                                    <div key={user.id}>
                                        <div key={user.id} className='profile-friend-card'>
                                            <div>
                                                <NavLink className='cool-username' id='navlink' to={`/users/${user.id}`}>
                                                    <div>
                                                        {user.username}
                                                    </div>
                                                    <img id='profile-friend-pic' src={user.profile_img ? user.profile_img : defaultPic} alt='profile-pic' />
                                                </NavLink>
                                            </div>
                                            {/* <div>
                                                <img id='profile-friend-pic' src={user.profile_img ? user.profile_img : defaultPic} alt='profile-pic' />
                                            </div> */}
                                        </div>
                                    </div>)}
                            </div>
                        </div>

                        {/* <div className='profile-comments'>
                            <div className='friends-top'>
                                {`${user.username}'s Friends Comments`}
                            </div>

                            <div className='comments-mid'>
                                Diplaying <span id='comments-length'>{userComments.length}</span> of <span id='comments-length'>{userComments.length}</span> comments ({<NavLink id='navlink' to={`/users/${sessionUser.id}/comments`}>View all</NavLink>} | {<NavLink id='navlink' to={`/users/${sessionUser.id}/comments/new`}>Add Comment</NavLink>})
                            </div>

                            <div className='comments-bot'>

                                {userComments?.map((comment) =>
                                    allUsers.map((user) => user.id === comment.commenter ?
                                        <div className='comments-rows' key={user.id}>
                                            <div className='comments-rows-left'>
                                                <div className='comment-username'>
                                                    <NavLink className='comment-username' to={`/users/${user.id}`}>{user.username}</NavLink>
                                                </div>
                                                <div>image <br /> placeholder</div>
                                            </div>

                                            <div className='comments-rows-right'>
                                                <div className='comment-date'>
                                                    {new Date(comment.created_at).toLocaleString()}
                                                </div>

                                                <div className='comment-body'>
                                                    {comment.comment_body}
                                                </div>
                                            </div>

                                        </div>

                                        : null))}

                            </div>
                        </div> */}

                    </div>

                </div>

            }


        </div>)

        : null

    )
}

export default HomePage
