import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Users.css'
import defaultPic from './images/user.png'

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users?.reverse());
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      // <div className='users-cards' key={user.id}>
      //   <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      // </div>


      <div key={user.id} className='users-cards'>
        <NavLink className='cool-username' id='navlink' to={`/users/${user.id}`}>
          <div>
            {user.username}
          </div>
          <img id='profile-friend-pic' src={user?.profile_pic?.url ? user?.profile_pic?.url : defaultPic} alt='profile-pic'
            onError={(e) => { e.target.onerror = null; e.target.src = defaultPic }}
          />
        </NavLink>
      </div>
    );
  });

  return (
    <>
      <div className='users-container'>
        <div className='users-inner-container'>
          <h2>Browse Users</h2>
          <div className='users-list-container'>
            <div className='users-list-top'>
              Users
            </div>
            <div className='users-list-bot'>
              {userComponents}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default UsersList;
