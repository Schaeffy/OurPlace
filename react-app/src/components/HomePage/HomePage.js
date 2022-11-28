import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import './HomePage.css'
import { getBlogs } from '../../store/blog';
import { loadUsers, getOneUser } from '../../store/users';
import '../images/divider.png'
import LoginForm from '../auth/LoginForm';
import defaultPic from '../images/user.png'
import { getComments } from '../../store/comments';


const HomePage = () => {
    const sessionUser = useSelector(state => state.session.user);

    // const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs.blogs)
    const allBlogs = Object.values(blogs)
    const userBlogs = Object.values(blogs).filter(blog => blog.user_id === sessionUser?.id)
    const users = useSelector(state => state.users.users)
    const comments = useSelector(state => state.comments.comments)
    const userComments = Object.values(comments).filter(comment => comment.commented === sessionUser?.id)
    const allUsers = Object.values(users)
    const [loaded, setLoaded] = useState(false);
    // console.log('uuuuuuuuuuuuuu', users)

    useEffect(() => {
        dispatch((loadUsers()))
        dispatch(getOneUser(sessionUser?.id))
        dispatch(getBlogs())
        dispatch(getComments()).then(() => setLoaded(true))
    }, [dispatch, sessionUser?.id])

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
                        <div className='bot-box'>one</div>
                        <div className='bot-box'>one</div>
                        <div className='bot-box'>one</div>
                        <div className='bot-box' id='last-box'>one</div>
                    </div>
                </div>




                :

                <div className='profile-page-container'>

                    <div className='profile-page-left'>
                        <div className='name'>
                            <h1>{sessionUser.username}</h1>
                        </div>

                        <div className='general'>
                            <div className='profile-pic'>
                                <img id='profile-pic' src={sessionUser.profile_pic ? sessionUser.profile_pic : defaultPic} alt='profile-pic' />
                            </div>
                            <div className='general-info'>
                                info
                            </div>
                        </div>

                        <div className='mood'>
                            <p>Mood: </p>
                            <p>View my: </p>
                        </div>

                        <div className='contact'>
                            <div className='contact-top'>
                                {`Contacting ${sessionUser.username}`}
                            </div>
                            <div className='contact-bot'>
                                <div>Some stuff</div>
                                <div>Some stuff</div>
                                <div>Some stuff</div>
                                <div>Some stuff</div>
                            </div>
                        </div>

                        <div className='url-container'>
                            <p id='profile-url'>OurPlace URL:</p>
                            <p>{`https://ourplace.com/users/${sessionUser.id}`}</p>
                        </div>

                        <div className='interests'>

                            <div className='interests-top'>
                                {`${sessionUser.username}'s Interests`}
                            </div>

                            <div className='interests-bot'>

                                <div className='general-interests'>
                                    <div className='general-interests-left'>General</div>
                                    <div className='general-interests-right'> lorum ipsum </div>
                                </div>

                                <div className='general-interests'>
                                    <div className='general-interests-left'>Movies</div>
                                    <div className='general-interests-right'> lorum ipsum </div>
                                </div>

                                <div className='general-interests'>
                                    <div className='general-interests-left'>Music</div>
                                    <div className='general-interests-right'> lorum ipsum </div>
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

                        </div>

                        <div className='interests'>

                            <div className='interests-top'>
                                {`${sessionUser.username}'s Links`}
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

                        </div>

                    </div>

                    <div className='profile-page-right'>
                        <div className='profile-blog'>
                            <h4>{sessionUser.username}'s Latest Blog Entries</h4>
                            {userBlogs.map((blog) => (
                                <div className='blog-entry-link'>
                                    {blog.blog_title} ({<NavLink id='navlink' to={`/blogs/${blog.id}`}>{`view more`}</NavLink>})
                                </div>
                            ))}

                            <div className='blog-entries-link'>
                                [<NavLink id='navlink' to={`/users/${sessionUser.id}/blogs`}>View all blog entries</NavLink>]
                            </div>
                        </div>

                        <div className='profile-blurbs'>
                            <div className='blurbs-top'>
                                {`${sessionUser.username}'s Blurbs`}
                            </div>

                            <div className='blurbs-bot'>
                                <div className='section'>
                                    <h4>About me:</h4>
                                </div>

                                <div className='section'>
                                    <h4>Who I'd like to meet:</h4>
                                </div>
                            </div>
                        </div>

                        <div className='profile-friends'>
                            <div className='friends-top'>
                                {`${sessionUser.username}'s Friend Space`}
                            </div>

                            <div className='friends-bot'>
                                {allUsers.map(user => <div>{user.username}</div>)}
                            </div>
                        </div>

                        <div className='profile-comments'>
                            <div className='friends-top'>
                                {`${sessionUser.username}'s Friends Comments`}
                            </div>

                            <div className='comments-mid'>
                                Diplaying <span id='comments-length'>{userComments.length}</span> of <span id='comments-length'>{userComments.length}</span> comments ({<NavLink id='navlink' to={`/users/${sessionUser.id}/comments`}>View all</NavLink>} | {<NavLink id='navlink' to={`/users/${sessionUser.id}/comments/new`}>Add Comment</NavLink>})
                            </div>

                            {/* <div>{`Displaying ${userComments.filter(user => user.id === comment.commenter)}`}</div> */}

                            <div className='comments-bot'>
                                {/* {userComments?.map((comment) => (<div>{comment?.comment_body}</div>))} */}

                                {userComments?.map((comment) =>
                                    allUsers.map((user) => user.id === comment.commenter ?
                                        <div className='comments-rows'>
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
                        </div>

                    </div>

                </div>

            }


        </div>)

        : null

    )
}

export default HomePage
