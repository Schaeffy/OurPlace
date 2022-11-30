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

    useEffect(() => {
        dispatch(getOneUser(userId))

        return () => {
            dispatch(resetUser())
        }
    }, [dispatch, userId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            comment_body: body
        }
        const updatedComment = await dispatch(createComment(payload, userId))
        if (updatedComment) {
            history.push(`/users/${userId}`)
        }
    }




    return (
        <>
            <div className="create-comment-container">
                <div className="create-comment-form-container">
                    <h2>Leave a Comment</h2>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="create-comment-form">
                            <div className="create-comment-form-input">
                                <div>
                                    <label htmlFor="body">Body: </label>
                                </div>
                                <div>
                                <textarea className='create-comment-form-input' value={body} onChange={(e) => setBody(e.target.value)} />
                                </div>
                            </div>
                            <div>

                            <button className='create-comment-form-submit-button' type="submit">Add Comment</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateComment;
