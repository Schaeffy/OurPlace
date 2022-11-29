import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { createBlog, getBlogs, getOneBlog, resetBlog, updateBlog, deleteBlog } from '../../store/blog'
import './BlogForm.css'

const DeleteBlogEntry = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { blogId } = useParams()


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
        await dispatch(deleteBlog(blogId))
        // await dispatch(getBlogs())
        // await dispatch(resetBlog())
        history.push(`/`)
        // return <Redirect to={`/blogs/${updatedBlog.id}`} />;

    }

    const handleCancel = async (e) => {
        e.preventDefault()
        history.push(`/blogs/${blogId}`)
    }


    return (

        // loaded &&
        <div className="blog-form-container">
            <div className="blog-form">
                <h2>Delete Blog Entry</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <p>Are you sure you want to delete this blog entry?</p>
                    <button type="submit">Delete Blog Entry</button>
                </form>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteBlogEntry;
