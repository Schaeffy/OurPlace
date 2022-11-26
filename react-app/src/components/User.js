import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getUserBlogs, getBlogs } from '../store/blog'
import defaultPic from './images/user.png'
import './User.css'

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  const blogs = useSelector(state => state.blogs.blogs)
  const userBlogs = Object.values(blogs).filter(blog => blog.user_id === +userId)
  const dispatch = useDispatch();

  // console.log(userBlogs)

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  // useEffect(() => {
  //     dispatch(getUserBlogs(userId))
  // },[dispatch, userId])
  // console.log('ooooooooooooooo',blogs)


  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className='profile-page-container'>

      <div className='profile-page-left'>
        <div className='name'>
          <h1>{user.username}</h1>
        </div>

        <div className='general'>
          <div className='profile-pic'>
            <img src={user.profile_pic ? user.profile_pic : defaultPic} alt='profile-pic' />
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
            {`Contacting ${user.username}`}
          </div>
          <div className='contact-bot'>
            <div>Some stuff</div>
            <div>Some stuff</div>
            <div>Some stuff</div>
            <div>Some stuff</div>
          </div>
        </div>

        <div className='url-container'>
          <p>OurPlace URL:</p>
          <p>{`https://ourplace.com/users/${user.id}`}</p>
        </div>

        <div className='interests'>

          <div className='interests-top'>
            {`${user.username}'s Interests`}
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
              <div className='general-interests-left'>Heroes</div>
              <div className='general-interests-right'> lorum ipsum </div>

            </div>

          </div>

        </div>

        <div className='interests'>

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
              <div className='general-interests-left'>Github</div>
              <div className='general-interests-right'> lorum ipsum </div>
            </div>

          </div>

        </div>

      </div>

      <div className='profile-page-right'>
        <div className='profile-blog'>
          <h4>{user.username}'s Latest Blog Entries</h4>
          {userBlogs.map((blog) => (
            <div>
              {blog.blog_title} ({<NavLink to={`/blogs/${blog.id}`}>{`view more`}</NavLink>})
            </div>
          ))}
        </div>

        <div className='profile-blurbs'>

        </div>

        <div className='profile-friends'>

        </div>

        <div className='profile-comments'>

        </div>
      </div>

    </div>
  );
}
export default User;
