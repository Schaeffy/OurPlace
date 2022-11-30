import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getBlogs } from '../../store/blog';
import { getOneUser, loadUsers } from '../../store/users';
import { getComments } from '../../store/comments';
import './Comments.css'
import defaultPic from '../images/user.png'


const Comments = () => {
    const sessionUser = useSelector(state => state.session.user);
    // console.log(sessionUser)
    const users = useSelector(state => state.users.users);
    const comments = useSelector(state => state.comments.comments)
    const allComments = Object.values(comments)
    const { userId } = useParams();
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false);

    const user = useSelector(state => state.users.user)
    const allUsers = Object.values(users)

    useEffect(() => {
        dispatch(getOneUser(userId))
        dispatch(loadUsers())
        dispatch(getComments()).then(() => setLoaded(true))
    }, [dispatch, userId])


    return (
        loaded &&
        <div className='comments-container'>

            <div className='comments-inner'>
                <h3>{user.username}'s Friend's Comments</h3>
                <div id='comments-navlink'>
                <NavLink to={`/users/${user.id}`} id='navlink'>« Back to {user.username}'s Profile</NavLink>
                </div>
                {/* {userComments?.map((comment) => (<div>{comment?.comment_body}</div>))} */}

                {allComments?.reverse().map((comment) =>
                    user.id === comment.commented ?
                        <div className='comments-rows'>
                            <div className='comments-rows-left'>
                                <div className='comment-username' id='comments-page-username'>
                                    {/* <NavLink className='comment-username' to={`/users/${user.id}`}>{user.username}</NavLink> */}
                                    {/* <NavLink className='comment-username' to={`/users/${user.id}`}>{allUsers.map(user => user.id === comment.commenter ? user.username : null)}</NavLink> */}
                                    {allUsers.map(user => user.id === comment.commenter ?
                                        <div>
                                            <NavLink className='comment-username' to={`/users/${user.id}`}>{user?.username}</NavLink>
                                            <div className='profile-pic' id='comments-page-pic'>
                                                <img id='comments-profile-pic' src={user.profile_pic ? user.profile_pic : defaultPic} alt='profile-pic' />
                                            </div>
                                        </div>
                                        : null)}

                                </div>

                            </div>

                            <div className='comments-rows-right'>
                                <div className='comment-date'>
                                    {new Date(comment.created_at).toLocaleString()}
                                </div>

                                <div className='comment-body'>
                                    {comment.comment_body}
                                </div>

                                <div>
                                    {sessionUser.id === comment.commented ?
                                    <NavLink to={`/comments/${comment.id}/delete`} id='delete-comment'>
                                    <button>Delete</button>
                                    </NavLink>
                                    : null}
                                </div>
                            </div>

                        </div>

                        : null)}
            </div>
        </div>
    )
}

export default Comments
