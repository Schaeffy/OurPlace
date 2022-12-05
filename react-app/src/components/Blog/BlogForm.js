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

    const [displayErrors, setDisplayErrors] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getBlogs())

        return () => {
            dispatch(resetBlog())
        }
    }, [dispatch])

    let validate = () => {
        let validationErrors = []

        if (!title) {
            validationErrors.push('Please enter a title for your blog entry')
        }
        if (!body) {
            validationErrors.push('Please enter a something for your blog entry')
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
                blog_title: title,
                blog_body: body
            }
            const newBlog = await dispatch(createBlog(payload)).catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
            if (newBlog) {
                history.push(`/blogs/${newBlog.id}`)
            }
            return errors
        }
        // const payload = {
        //     // user_id: user.id,
        //     blog_title: title,
        //     blog_body: body
        // }
        // const updatedBlog = await dispatch(createBlog(payload))
        // if (updatedBlog) {
        //     history.push(`/blogs/${updatedBlog.id}`)
        //     // return <Redirect to={`/blogs/${updatedBlog.id}`} />;
        // }
    }


    return (
        <>
            <div className="blog-form-container">
                <div className="blog-form">
                    <h2>Create a Blog Entry</h2>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="blog-title">
                            <div className='blog-title'>
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
                        <button id='button' className='blog-submit-button' type="submit">Publish Blog Entry</button>
                    </form>
                </div>
                <div className='right-side-container'>
                    <div className='rules-container'>
                        <div className='rules'>
                            <div>Be kind</div>
                            <div>No spam</div>
                            <div>No explicit content</div>
                        </div>

                    </div>
                    <div className='errors' id='errors-container'>
                        {errors.map((error, ind) => (
                            <div id='error-message' key={ind}>{error}</div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default CreateBlogEntry;
