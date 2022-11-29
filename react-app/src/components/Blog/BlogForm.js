import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { createBlog, getBlogs, getOneBlog, resetBlog } from '../../store/blog'
import './BlogForm.css'

const CreateBlogEntry = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    // const { userId } = useParams()

    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
        dispatch(getBlogs())

        return () => {
            dispatch(resetBlog())
        }
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            // user_id: user.id,
            blog_title: title,
            blog_body: body
        }
        const updatedBlog = await dispatch(createBlog(payload))
        if (updatedBlog) {
            history.push(`/blogs/${updatedBlog.id}`)
            // return <Redirect to={`/blogs/${updatedBlog.id}`} />;
        }
    }


    return (
        <>
            <div className="blog-form-container">
                <div className="blog-form">
                    <h2>Create a Blog Entry</h2>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="blog-title">
                            <div>
                                <label id='blog-form-title'>Title: </label>
                            </div>
                            <input className='blog-title-input' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="blog-body">
                            <div>
                                <label htmlFor="body">Body: </label>
                            </div>
                            <textarea className='blog-body-input' value={body} onChange={(e) => setBody(e.target.value)} />
                        </div>
                        <button className='blog-submit-button' type="submit">Publish Blog Entry</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateBlogEntry;
