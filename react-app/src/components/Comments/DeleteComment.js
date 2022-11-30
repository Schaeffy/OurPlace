import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { deleteComment } from '../../store/comments'
import './DeleteComment.css'

const DeleteComment = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { userId, commentId } = useParams()


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
        await dispatch(deleteComment(commentId))
        // await dispatch(getBlogs())
        // await dispatch(resetBlog())
        history.goBack()
        // return <Redirect to={`/blogs/${updatedBlog.id}`} />;

    }

    const handleCancel = async (e) => {
        e.preventDefault()
        history.goBack()
    }


    return (

        // loaded &&
        <div className="blog-form-container">
            <div className="blog-form">
                <h2>Delete Comment</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <div id='delete-message'>Are you sure you want to delete this comment?</div>
                    <div className='blog-form-buttons'>
                        <button type="submit">Delete Comment</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default DeleteComment;
