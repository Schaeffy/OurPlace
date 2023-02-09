import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { editComment, resetComment, getOneComment } from '../../store/comments'
import './EditComment.css'

const EditComment = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { commentId } = useParams()


    const user = useSelector(state => state.session.user)


    useEffect(() => {
        dispatch(getOneComment(commentId)).then(() => setLoaded(true))

        return () => {
            dispatch(getOneComment(commentId))
            // dispatch(resetComment())
        }
    }, [dispatch, commentId])

    const comment = useSelector(state => state.comments?.singleComment)
    // console.log('comment', comment)

    // const [body, setBody] = useState(comment.comment_body)
    const [body, setBody] = useState('')
    // console.log('body', body)
    const [loaded, setLoaded] = useState(false)

    const [displayErrors, setDisplayErrors] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        setBody(comment.comment_body)
    }, [comment])

    // console.log('new body', body)


    let validate = () => {
        let validationErrors = []

        if (!body) {
            validationErrors.push('Please enter some content for your comment')
        }
        if (body.length > 600) {
            validationErrors.push('Please keep comments less than 600 characters')
        }
        setErrors(validationErrors)

        if (validationErrors.length) setDisplayErrors(true)

        return validationErrors
    }



    useEffect(() => {
        if (displayErrors) {
            validate()
        }
    }, [body])



    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrors([])
        setDisplayErrors(false)

        let validationErrors = validate()
        if (validationErrors.length) return


        if (!errors.length) {
            const payload = {
                // user_id: user.id,
                comment_body: body
            }
            const updatedBlog = await dispatch(editComment(payload, commentId)).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
            if (updatedBlog) {
                history.goBack()
                // return <Redirect to={`/blogs/${updatedBlog.id}`} />;
            }
            return errors
        }
    }

    const handleCancel = async (e) => {
        e.preventDefault()
        history.goBack()
    }



    return (
        loaded &&
        <div className="blog-form-container">
            <div className="blog-form">
                <h2>Edit Comment</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <div className='blog-edit-title'>
                            <label id='blog-form-title'>Content: </label>
                        </div>
                        <textarea className='blog-body-input' value={body} onChange={(e) => setBody(e.target.value)} />
                    </div>
                    <div className='blog-form-buttons'>
                        <button id='button' type="submit">Update Comment</button>
                        <button id='button' onClick={handleCancel}>Cancel</button>
                    </div>
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
    )
}

export default EditComment;
