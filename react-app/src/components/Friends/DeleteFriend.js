import React from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getFriends } from '../../store/friends';
import { loadUsers, resetUser, getOneUser } from '../../store/users';
import '../Users.css';
import defaultPic from '../images/user.png'
import { deleteFriend } from '../../store/friends';

const Unfriend = () => {
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

    const handleUnfriend = async (e) => {
        e.preventDefault()
        await dispatch(deleteFriend(userId))
        // await dispatch(getBlogs())
        // await dispatch(resetBlog())
        history.goBack()
        // return <Redirect to={`/blogs/${updatedBlog.id}`} />;

    }

    return (
        <div className="users-container">
            <div className="users-inner-container">
                <h2>Remove Friend</h2>
                <br />
                <div>
                    Are you sure you want to remove this person as a Friend?
                </div>

                <button onClick={handleUnfriend}>Remove Friend</button>
                <button onClick={() => history.goBack()}>Cancel</button>

            </div>
        </div>
    );
}

export default Unfriend;
