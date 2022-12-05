import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { createComment } from '../../store/comments'
import './CommentForm.css'
import { getOneUser, resetUser } from '../../store/users';

const CreateComment = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { userId } = useParams()

    const user = useSelector(state => state.session.user)

    const [body, setBody] = useState('')

    const [displayErrors, setDisplayErrors] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(getOneUser(userId))

        return () => {
            dispatch(resetUser())
        }
    }, [dispatch, userId])


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
                comment_body: body
            }
            const updatedComment = await dispatch(createComment(payload, userId)).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
            if (updatedComment) {
                history.push(`/users/${userId}`)
            }

        }
    }




    return (
        <>
            <div className="create-comment-container">
                <div className="create-comment-form-container">
                    <h2>Leave a Comment</h2>
                    <br />
                    <form className='create-comment-form' onSubmit={handleSubmit}>
                        <div id="create-comment-form-input">
                            <div>
                                <label id='comment-body'>Your Comment: </label>
                            </div>
                            <div className='comment-textarea'>
                                <textarea className='create-comment-form-input' value={body} onChange={(e) => setBody(e.target.value)} />
                            </div>
                        </div>
                        <div className='add-comment'>
                            <button id='button' className='create-comment-form-submit-button' type="submit">Add Comment</button>
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
        </>
    )
}

export default CreateComment;
