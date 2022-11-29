import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { createBlog, getBlogs, getOneBlog, resetBlog, updateBlog } from '../../store/blog'
import './BlogForm.css'

const EditBlogEntry = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { blogId } = useParams()


    const user = useSelector(state => state.session.user)
    const blog = useSelector(state => state.blogs.singleBlog)

    const [title, setTitle] = useState(blog.blog_title)
    const [body, setBody] = useState(blog.blog_body)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(getOneBlog(blogId)).then(() => setLoaded(true))

        // return () => {
        //     dispatch(resetBlog())
        // }
    }, [dispatch, blogId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            // user_id: user.id,
            blog_title: title,
            blog_body: body
        }
        const updatedBlog = await dispatch(updateBlog(payload, blog.id))
        if (updatedBlog) {
            history.push(`/blogs/${blog.id}`)
            // return <Redirect to={`/blogs/${updatedBlog.id}`} />;
        }
    }


    return (
            <div className="blog-form-container">
                <div className="blog-form">
                    <h2>Create a Blog Entry</h2>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <div>
                                <label id='blog-form-title'>Title: </label>
                            </div>
                            <input className='blog-title-input' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="">
                            <div>
                                <label id='blog-form-title'>Content: </label>
                            </div>
                            <textarea className='blog-body-input' value={body} onChange={(e) => setBody(e.target.value)} />
                        </div>
                        <button className='blog-submit-button' type="submit">Update Blog Entry</button>
                    </form>
                </div>
            </div>
    )
}

export default EditBlogEntry;
