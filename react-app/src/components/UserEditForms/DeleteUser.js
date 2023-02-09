import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { deleteUser } from '../../store/users'
import { logout } from '../../store/session'
import './Edit.css'

const DeleteUser = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { userId } = useParams()


    const user = useSelector(state => state.session.user)
    const blog = useSelector(state => state.blogs.singleBlog)

    const [loaded, setLoaded] = useState(false)

    // useEffect(() => {
    //     dispatch(getOneBlog(blogId))
    //     dispatch(getBlogs())

    //     return () => {
    //         dispatch(resetBlog())
    //     }
    // }, [dispatch, blogId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(deleteUser(userId))
        await dispatch(logout())
        // await dispatch(getBlogs())
        // await dispatch(resetBlog())
        history.push(`/`)
        // return <Redirect to={`/blogs/${updatedBlog.id}`} />;

    }

    const handleCancel = async (e) => {
        e.preventDefault()
        history.push(`/`)
    }


    return (

        // loaded &&
        <div className="blog-form-container">
            <div className="blog-form">
                <h2>Delete Your Account</h2>
                <form onSubmit={handleSubmit}>
                <br />
                    <div id='delete-message'>Are you sure you want to delete your account?</div>
                    <div className='blog-form-buttons'>
                        <button id='button' type="submit">Delete</button>
                        <button id='button' onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DeleteUser;
