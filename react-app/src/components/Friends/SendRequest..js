import React from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getFriends } from '../../store/friends';
import { loadUsers, resetUser, getOneUser } from '../../store/users';
import defaultPic from '../images/user.png'
import { createRequest } from '../../store/requests';
import './Friends.css'

const SendRequest = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    // const users = useSelector(state => state.users.users)
    // const allUsers = Object.values(users)
    const { userId } = useParams();
    // console.log('ALL USERS', allUsers)
    // console.log(allFriends)
    // console.log('user friends', userFriends)
    // console.log(userFriendsIds)

    // console.log('FRIEND INFO', friendsInfo)
    const history = useHistory()
    const [loaded, setLoaded] = useState(false);

    // useEffect(() => {
    //     dispatch(getFriends(userId));
    //     dispatch(loadUsers()).then(() => setLoaded(true))
    // }, [dispatch, userId]);

    const handleRequest = async (e) => {
        e.preventDefault()
        await dispatch(createRequest(userId))
        // await dispatch(getBlogs())
        // await dispatch(resetBlog())
        history.goBack()
        // return <Redirect to={`/blogs/${updatedBlog.id}`} />;

    }

    return (
        <div className="users-container">
            <div className="users-inner-container">
                <h2>Add Friend</h2>
                <br />
                <div>
                    Are you sure you want to add this person as a Friend? They will be able to accept or decline your request.
                </div>
                <br />

                <button onClick={handleRequest}>Send Request</button>
                <button id='cancel-button' onClick={() => history.goBack()}>Cancel</button>

            </div>
        </div>
    );
}

export default SendRequest;
