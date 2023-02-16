import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getFriends } from '../../store/friends';
import { loadUsers, resetUser, getOneUser } from '../../store/users';
import '../Users.css';
import defaultPic from '../images/user.png'

const Friends = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.users.users)
    const allUsers = Object.values(users)
    const { userId } = useParams();
    const friends = useSelector(state => state.friends);
    const allFriends = Object.values(friends);
    const userFriends = allFriends.filter(friend => Object.values(friend).includes(+userId))
    const userFriendsIds = userFriends.map(friend => +userId === friend.user1 ? friend.user2 : friend.user1)
    // console.log('ALL USERS', allUsers)
    // console.log(allFriends)
    // console.log('user friends', userFriends)
    // console.log(userFriendsIds)
    const friendsInfo = allUsers.filter(user => userFriendsIds.includes(user.id))
    // console.log('FRIEND INFO', friendsInfo)
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        dispatch(getFriends(userId));
        dispatch(loadUsers()).then(() => setLoaded(true))
    }, [dispatch, userId]);

    return (loaded &&
        <div className="users-container">
            <div className="users-inner-container">
                <h2>Browse Friends</h2>
                <div className="users-list-container">
                    <div className="users-list-top">
                        Friends
                    </div>
                    <div className="users-list-bot">
                        {friendsInfo?.reverse().map(friend => (
                            <div key={friend.id} className="users-cards">
                                <NavLink className='cool-username' id='navlink' to={`/users/${friend.id}`}>
                                    <div>
                                        {friend.username}
                                    </div>
                                    <img id='profile-friend-pic' src={friend.profile_pic?.url ? friend.profile_pic?.url : defaultPic} alt='profile-pic'
                                        onError={(e) => { e.target.onerror = null; e.target.src = defaultPic }}
                                    />
                                </NavLink>
                            </div>
                        )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Friends;
