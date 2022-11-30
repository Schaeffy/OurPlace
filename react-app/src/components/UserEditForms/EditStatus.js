import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { resetSession } from '../../store/session'
import { getOneUser, updateUser, resetUser } from '../../store/users'
import './Edit.css'

const EditStatus = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { userId } = useParams()

    const user = useSelector(state => state.session.user)

    const [status, setStatus] = useState(user?.status)
    const [mood, setMood] = useState(user?.mood)
    const [brief, setBrief] = useState(user?.brief)


    useEffect(() => {
        dispatch(getOneUser(userId))

        return () => {
            dispatch(resetUser())
            // dispatch(resetSession())
        }
    }, [dispatch, userId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            status,
            mood,
            brief_you: brief
        }
        const updatedUser = await dispatch(updateUser(payload, userId))
        if (updatedUser) {
            // console.log(updatedUser)
            history.push(`/users/${userId}`)
        }
        // if (user) {
        //     return <Redirect to='/' />;
        //   }
    }

    return (
        <>
            <div className="edit-profile-container">
                <div className="edit-profile-form-container">
                    <h2>Edit Your Profile</h2>
                    <br />
                    <p>All fields are optional and can be left empty if you want.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="edit-profile-form-button">
                            <button type="submit">Save</button>
                        </div>
                        <div className="edit-profile-form-input">
                            <div id='category'>
                                Status:
                            </div>

                            <div id="status-label">
                                <label id="status-label">What are you up to right now?</label>
                            </div>

                            <input className='edit-profile-input' value={status} onChange={(e) => setStatus(e.target.value)}></input>

                            <div className='examples'>
                                <span id='examples'>Examples: </span> <span id='examples-example'>studying, sleeping, working, netflix-chillin'...</span>
                            </div>
                        </div>

                        <div className="edit-profile-form-input">
                            <div id='category'>
                                Mood:
                            </div>

                            <div id="status-label">
                                <label id="status-label">How are you feeling right meow?</label>
                            </div>

                            <input className='edit-profile-input' value={mood} onChange={(e) => setMood(e.target.value)}></input>

                            <div className='examples'>
                                <span id='examples'>Examples: </span> <span id='examples-example'>sad, stoked, bored, busy...</span>
                            </div>
                        </div>

                        <div className="edit-profile-form-input">
                            <div id='category'>
                                You:
                            </div>

                            <div id="status-label">
                                <label id="status-label">A brief description about you</label>
                            </div>

                            <input className='edit-profile-input' value={brief} onChange={(e) => setBrief(e.target.value)}></input>

                            <div className='examples'>
                                <span id='examples'>Examples: </span> <span id='examples-example'>a/s/l?</span>
                            </div>
                        </div>



                        <div className="edit-profile-form-button">
                            <button type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditStatus
