import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import LoginForm from './components/auth/LoginForm';
import LoginPage from './components/auth/LoginPage';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import HomePage from './components/HomePage/HomePage';
import Blogs from './components/Blog/Blog';
import SignUpPage from './components/auth/SignUpPage';
import UserBlog from './components/Blog/UserBlog';
import BlogEntry from './components/Blog/BlogEntry';
import Footer from './components/Footer/Footer';
import EditProfile from './components/UserEditForms/EditProfile';
import CreateBlogEntry from './components/Blog/BlogForm';
import EditBlogEntry from './components/Blog/EditBlog';
import DeleteBlogEntry from './components/Blog/DeleteBlog';
import Comments from './components/Comments/Comments';
import CreateComment from './components/Comments/CommentForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginPage />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpPage />
        </Route>

        <Route path='/users' exact={true} >
          <UsersList />
        </Route>

        <Route path='/users/:userId' exact={true} >
          <User />
        </Route>

        <Route path='/users/:userId/blogs' exact={true} >
          <UserBlog />
        </Route>

        <Route path='/' exact={true} >
          <HomePage />
        </Route>


        <Route path='/blogs' exact={true} >
          <Blogs />
        </Route>

        {/* <Switch> */}
        <Route path='/blogs/new' exact >
          <CreateBlogEntry />
        </Route>
        <Route path='/blogs/:blogId' exact={true} >
          <BlogEntry />
        </Route>
        {/* </Switch> */}

        <Route path='/blogs/:blogId/edit' exact >
          <EditBlogEntry />
        </Route>

        <Route path='/blogs/:blogId/delete' exact >
          <DeleteBlogEntry />
        </Route>

        <Route path='/users/:userId/edit' exact >
          <EditProfile />
        </Route>

        <Route path='/users/:userId/comments' exact >
          <Comments />
        </Route>

        <Route path='/users/:userId/comments/new' exact >
          <CreateComment />
        </Route>

      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
