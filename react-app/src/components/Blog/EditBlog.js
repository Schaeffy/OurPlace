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

    const [displayErrors, setDisplayErrors] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getOneBlog(blogId)).then(() => setLoaded(true))

        // return () => {
        //     dispatch(resetBlog())
        // }
    }, [dispatch, blogId])

    let validate = () => {
        let validationErrors = []

        if (!title) {
            validationErrors.push('Please enter a title for your blog entry')
        }
        if (title.length > 100) {
            validationErrors.push('Title must be less than 100 characters')
        }
        if (!body) {
            validationErrors.push('Please enter some content for your blog entry')
        }

        if (body.length > 9000) {
            validationErrors.push('Please keep blog entries less than 9000 characters')
        }

        // if (title.length < 3) {
        //     validationErrors.push('Title must be at least 3 character long')
        // }
        // if (body.length < 3) {
        //     validationErrors.push('Blog content must be at least 3 character long')
        // }
        setErrors(validationErrors)

        if (validationErrors.length) setDisplayErrors(true)

        return validationErrors
    }

    useEffect(() => {
        if (displayErrors) {
            validate()
        }
    }, [title, body])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrors([])
        setDisplayErrors(false)

        let validationErrors = validate()
        if (validationErrors.length) return

        if (!errors.length) {
            const payload = {
                // id: blogId,
                blog_title: title,
                blog_body: body,
            }
            let updatedBlog = await dispatch(updateBlog(payload, blog.id)).catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
            if (updatedBlog) {
                // history.push(`/blogs/${blogId}`)
                history.goBack()
            }
            return errors
        }

        // const payload = {
        //     // user_id: user.id,
        //     blog_title: title,
        //     blog_body: body
        // }
        // const updatedBlog = await dispatch(updateBlog(payload, blog.id))
        // if (updatedBlog) {
        //     history.goBack()
        //     // return <Redirect to={`/blogs/${updatedBlog.id}`} />;
        // }
    }

    const handleCancel = async (e) => {
        e.preventDefault()
        history.goBack()
    }


    return (
        <div className="blog-form-container">
            <div className="blog-form">
                <h2>Edit Blog Entry</h2>
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
                    <div className='blog-form-buttons'>
                        <button id='button' className='blog-submit-button' type="submit">Update Blog Entry</button>
                        <button id='button' onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
            <div className='errors' id='errors-container'>
                {errors.map((error, ind) => (
                    <div id='error-message' key={ind}>{error}</div>
                ))}
            </div>
        </div>
    )
}

export default EditBlogEntry;
