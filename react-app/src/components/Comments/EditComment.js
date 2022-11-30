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
    const comment = useSelector(state => state.comments.singleComment)

    const [body, setBody] = useState(comment.comment_body)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(getOneComment(commentId)).then(() => setLoaded(true))

        return () => {
            dispatch(getOneComment(commentId))
        }
    }, [dispatch, commentId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            // user_id: user.id,
            comment_body: body
        }
        const updatedBlog = await dispatch(editComment(payload, commentId))
        if (updatedBlog) {
            history.goBack()
            // return <Redirect to={`/blogs/${updatedBlog.id}`} />;
        }
    }


    return (
        loaded &&
            <div className="blog-form-container">
                <div className="blog-form">
                    <h2>Edit Comment</h2>
                    <br />
                    <form onSubmit={handleSubmit}>
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

export default EditComment;
