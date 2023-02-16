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
    // const users = useSelector(state => state.users.users);
    const comments = useSelector(state => state.comments.comments)
    const allComments = Object.values(comments)
    const { userId } = useParams();
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false);

    const user = useSelector(state => state.users.user)
    // const allUsers = Object.values(users)

    useEffect(() => {
        // dispatch(loadUsers())
        dispatch(getOneUser(userId))
        dispatch(getComments()).then(() => setLoaded(true))
    }, [dispatch, userId])


    return (
        loaded && (
            <div className='comments-container'>

                <div className='comments-inner'>
                    <h3>{user.username}'s Friend's Comments</h3>
                    <div id='comments-navlink'>
                        <NavLink to={`/users/${user.id}`} id='navlink'>« Back to {user?.username}'s Profile</NavLink>
                    </div>
                    {/* {userComments?.map((comment) => (<div>{comment?.comment_body}</div>))} */}

                    {/* {allComments?.reverse()?.map((comment) =>
                        user?.id === comment?.commented ?
                            <div className='comments-rows' key={comment.id}>
                                <div className='comments-rows-left'>
                                    <div className='comment-username' id='comments-page-username'>
                                        {allUsers?.map(user => user?.id === comment?.commenter ?
                                            <div key={user.id}>
                                                <NavLink className='comment-username' to={`/users/${user.id}`}>{user?.username}</NavLink>
                                                <div className='profile-pic' id='comments-page-pic'>
                                                    <img id='comments-profile-pic' src={user?.profile_img ? user?.profile_img : defaultPic} alt='profile-pic'
                                                        onError={(e) => { e.target.onerror = null; e.target.src = defaultPic }}
                                                    />
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
                                        {comment?.comment_body}
                                    </div>

                                    <div>
                                        {sessionUser && sessionUser?.id === comment.commented ?
                                            <NavLink to={`/comments/${comment.id}/delete`} id='delete-comment'>
                                                <button id='button2'>Delete</button>
                                            </NavLink>
                                            : null}
                                    </div>
                                </div>

                            </div>

                            : null)} */}



                    {allComments?.reverse()?.map((comment) =>
                        user.id === comment.commented.id ?
                            <div className='comments-rows' key={comment.id}>
                                <div className='comments-rows-left'>
                                    <div className='comment-username' id='comments-page-username'>

                                        <div key={user.id}>
                                            <NavLink className='comment-username' to={`/users/${comment.commenter.id}`}>{comment.commenter.username}</NavLink>
                                            <div className='profile-pic' id='comments-page-pic'>
                                                <img id='comments-profile-pic' src={comment.commenter?.profile_pic?.url ? comment.commenter?.profile_pic?.url : defaultPic} alt='profile-pic'
                                                    onError={(e) => { e.target.onerror = null; e.target.src = defaultPic }}
                                                />
                                            </div>
                                        </div>


                                    </div>

                                </div>

                                <div className='comments-rows-right'>
                                    <div className='comment-date'>
                                        {new Date(comment.created_at).toLocaleString()}
                                    </div>

                                    <div className='comment-body'>
                                        {comment?.comment_body}
                                    </div>

                                    <div>
                                        {sessionUser && sessionUser?.id === comment.commented ?
                                            <NavLink to={`/comments/${comment.id}/delete`} id='delete-comment'>
                                                <button id='button2'>Delete</button>
                                            </NavLink>
                                            : null}
                                    </div>
                                </div>

                            </div>

                            : null)}



                </div>
            </div>)
    )
}

export default Comments
