import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getBlogs, resetBlog } from '../../store/blog';
import { loadUsers, getOneUser, resetUser } from '../../store/users';
import '../images/divider.png'
import defaultPic from '../images/user.png'
import { getFriends, createFriend, deleteFriend, resetFriends } from '../../store/friends';
import { getRequests, createRequest, deleteRequest, resetRequests } from '../../store/requests';
import DeleteRequest from '../Friends/DeleteRequest';
import AcceptRequest from '../Friends/AcceptRequest';

const FriendRequests = () => {
    const sessionUser = useSelector(state => state.session.user);

    const user = useSelector(state => state.users.user);

    // const user = useSelector(state => state.user);
    const dispatch = useDispatch()

    const users = useSelector(state => state.users.users)
    const allUsers = Object.values(users)
    const [loaded, setLoaded] = useState(false);
    const userId = sessionUser?.id
    // console.log('uuuuuuuuuuuuuu', users)

    const friends = useSelector(state => state.friends);
    const allFriends = Object.values(friends);
    const userFriends = allFriends.filter(friend => Object.values(friend).includes(+userId))
    const userFriendsIds = userFriends.map(friend => +userId === friend.user1 ? friend.user2 : friend.user1)
    const friendsInfo = allUsers.filter(user => userFriendsIds.includes(user.id))


    const requests = useSelector(state => state.requests);
    const allRequests = Object.values(requests);
    // console.log('..................', allRequests)
    // const requestsReceived = allRequests.filter(request => request?.receiving_user_id === +userId)
    const requestsReceived = allRequests.map(request => request?.receiving_user_id === +userId ? request.requesting_user_id : null).filter(req => req !== null)
    const requestsSent = allRequests.filter(request => request?.requesting_user_id === +userId ? request.receiving_user_id : null).filter(req => req !== null)
    const requestedUsers = allUsers.filter(user => requestsReceived.includes(user.id))
    const sentUsers = allUsers.filter(user => requestsSent.includes(user.id))

    const [requestId, setRequestId] = useState(1)

    useEffect(() => {
        dispatch(getOneUser(userId))
        dispatch(getFriends(userId))
        dispatch(getRequests())
        dispatch(loadUsers()).then(() => setLoaded(true))
        // dispatch(getComments()).then(() => setLoaded(true))

        return () => {
            dispatch(resetUser())
            dispatch(resetRequests())
            dispatch(resetFriends())
            // dispatch(resetComment())
        }
    }, [dispatch, sessionUser])

    return (loaded &&
        <div className="users-container">
            <div className="users-inner-container">
            <h2>Friend Requests</h2>
                <div className='profile-comments'>
                    {/* <div className='friends-top'>
                    </div> */}
                    <br />

                    <div className='comments-mid'>
                        You have <span id='comments-length'>{requestsReceived.length}</span> friend requests
                    </div>

                    <div className='comments-bot'>


                        {requestedUsers?.reverse().slice(0, 8).map((comment) =>

                            <div className='comments-rows' key={comment.id}>
                                <div className='comments-rows-left'>
                                    <div className='comment-username'>
                                        <NavLink className='comment-username' to={`/users/${comment?.id}`}>{comment?.username}</NavLink>
                                    </div>
                                    <img id='profile-friend-pic' src={comment?.profile_pic?.url ? comment?.profile_pic?.url : defaultPic} alt='profile-pic'
                                        onError={(e) => { e.target.onerror = null; e.target.src = defaultPic }}
                                    />
                                </div>
                                {allRequests.map(request => request.requesting_user_id === comment.id && request.receiving_user_id === userId ?
                                    <div className='comments-rows-right' key={request.id}>
                                        <div className='comment-date'>
                                            {/* {new Date((requestsReceived.filter(req => req.requesting_user_id === comment.id)).created_at).toLocaleString()} */}
                                            {new Date(request.created_at).toLocaleString()}
                                        </div>

                                        <div className='comment-body'>
                                            <h4>Friend Request</h4>
                                        </div>

                                        <div>
                                            {sessionUser && sessionUser?.id === request?.receiving_user_id ?
                                                <div className='comment-buttons'>
                                                    <AcceptRequest requesterId={comment.id} requestId={request.id} />
                                                    <DeleteRequest id={request.id} />
                                                </div>
                                                : null}
                                        </div>
                                    </div> : null
                                )}

                            </div>

                        )}


                    </div>
                </div>

            </div>
        </div>

    )
}
export default FriendRequests
