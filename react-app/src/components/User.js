import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getUserBlogs, getBlogs, resetBlog } from '../store/blog'
import { getComments, getUserComments, resetComment } from '../store/comments';
import defaultPic from './images/user.png'
import './User.css'
import { loadUsers, resetUser, getOneUser } from '../store/users';

function User() {
  // const [user, setUser] = useState({});
  const { userId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.users.user);

  const sessionUser = useSelector(state => state.session.user);

  const blogs = useSelector(state => state.blogs.blogs)
  const userBlogs = Object.values(blogs).filter(blog => blog.user_id === +userId)
  const dispatch = useDispatch();

  const comments = useSelector(state => state.comments.comments)
  const userComments = Object.values(comments).filter(comment => comment.commented === +userId)

  const users = useSelector(state => state.users.users)
  const allUsers = Object.values(users)

  // console.log(userBlogs)


  // useEffect(() => {
  //     dispatch(getUserBlogs(userId))
  // },[dispatch, userId])
  // console.log('ooooooooooooooo',blogs)


  // useEffect(() => {
  //   if (!userId) {
  //     return;
  //   }
  //   (async () => {
  //     const response = await fetch(`/api/users/${userId}`);
  //     const user = await response.json();
  //     setUser(user);
  //   })();
  // }, [userId]);

  useEffect(() => {
    dispatch(getOneUser(userId))
    dispatch((loadUsers()))
    dispatch(getBlogs())
    dispatch(getComments()).then(() => setLoaded(true))

    return () => {
      dispatch(resetUser())
      dispatch(resetBlog())
      dispatch(resetComment())
    }
  }, [dispatch, userId])


  // useEffect(()=> {
  //     dispatch(getBlogs())
  // },[dispatch])

  // useEffect(() => {
  //     dispatch(getComments()).then(() => setLoaded(true))
  // }, [dispatch])


  // useEffect(() => {

  // }, [dispatch])


  if (!user) {
    return null;
  }

  return (
    loaded && <div className='profile-page-container'>

      <div className='profile-page-left'>
        <div className='profile-name'>
          <h2>{user.username}</h2>
        </div>

        <div className='general'>
          <div className='profile-pic'>
            <img id='profile-pic' src={user.profile_pic ? user.profile_pic : defaultPic} alt='profile-pic' />
          </div>
          <div className='general-info'>
            <div id='profile-status'>
              "{user.status}"
            </div>
            <div id='profile-brief'>
              {user.brief_you}
            </div>
          </div>
        </div>

        <div className='mood'>
          <span id='profile-mood'>Mood: </span>{user.mood}
          {/* <div id='profile-view-my'>View my: </div> */}
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
          <p id='profile-url'>OurPlace URL:</p>
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
              <div className='general-interests-left' id='very-bot'>Github</div>
              <div className='general-interests-right' id='very-bot'> lorum ipsum </div>
            </div>

          </div>

        </div>

      </div>

      <div className='profile-page-right'>
        <div className='profile-blog'>
          <h4>{user.username}'s Latest Blog Entries</h4>
          {userBlogs.reverse().map((blog) => (
            <div className='blog-entry-link' key={blog.id}>
              {blog.blog_title} ({<NavLink id='navlink' to={`/blogs/${blog.id}`}>{`view more`}</NavLink>})
            </div>
          ))}

          <div className='blog-entries-link'>
            [<NavLink className='view-entries' id='navlink' to={`/users/${user.id}/blogs`}>View all blog entries</NavLink>]
          </div>
        </div>

        <div className='profile-blurbs'>
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
        </div>

        <div className='profile-friends'>
          <div className='friends-top'>
            {`${user.username}'s Friend Space`}
          </div>

          <div className='friends-bot'>
            {allUsers.map(user => <div>{user.username}</div>)}
          </div>
        </div>

        <div className='profile-comments'>
          <div className='friends-top'>
            {`${user.username}'s Friends Comments`}
          </div>

          <div className='comments-mid'>
            Diplaying <span id='comments-length'>{userComments.length}</span> of <span id='comments-length'>{userComments.length}</span> comments ({<NavLink id='navlink' to={`/users/${user.id}/comments`}>View all</NavLink>} | {<NavLink id='navlink' to={`/users/${user.id}/comments/new`}>Add Comment</NavLink>})
          </div>

          {/* <div>{`Displaying ${userComments.filter(user => user.id === comment.commenter)}`}</div> */}

          <div className='comments-bot'>
            {/* {userComments?.map((comment) => (<div>{comment?.comment_body}</div>))} */}

            {userComments?.reverse().map((comment) =>
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

                    <div>
                      {sessionUser.id === comment.commenter ?
                        <div className='comment-buttons'>
                          <NavLink to={`/comments/${comment.id}/edit`}>
                            <button className='comment-edit-button'>Edit</button>
                          </NavLink>
                          <NavLink to={`/comments/${comment.id}/delete`} id='delete-comment'>
                            <button className='comment-delete-button'>Delete</button>
                          </NavLink>
                        </div>
                        : null}
                    </div>
                  </div>

                </div>

                : null))}


          </div>
        </div>

      </div>

    </div>
  );
}
export default User;
