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

    const user = useSelector(state => state.users.user)

    const [pic, setPic] = useState('')
    const [status, setStatus] = useState('')
    const [mood, setMood] = useState('')
    const [brief, setBrief] = useState('')
    const [aboutMe, setAboutMe] = useState('')
    const [meet, setMeet] = useState('')
    const [general, setGeneral] = useState('')
    const [music, setMusic] = useState('')
    const [movies, setMovies] = useState('')
    const [television, setTelevision] = useState('')
    const [books, setBooks] = useState('')
    const [heroes, setHeroes] = useState('')
    const [instagram, setInstagram] = useState('')
    const [snapchat, setSnapchat] = useState('')
    const [tiktok, setTiktok] = useState('')
    const [twitter, setTwitter] = useState('')
    const [twitch, setTwitch] = useState('')
    const [youtube, setYoutube] = useState('')
    const [soundcloud, setSoundcloud] = useState('')
    const [spotify, setSpotify] = useState('')
    const [pintrest, setPintrest] = useState('')
    const [github, setGithub] = useState('')

    const [displayErrors, setDisplayErrors] = useState(false)
    const [errors, setErrors] = useState([])


    useEffect(() => {
        dispatch(getOneUser(userId))

        return () => {
            dispatch(resetUser())
            // dispatch(resetSession())
        }
    }, [dispatch, userId])

    useEffect(() => {
        setStatus(user?.status)
        setMood(user?.mood)
        setBrief(user?.brief_you)
        setAboutMe(user?.about_me)
        setMeet(user?.here_for)
        setGeneral(user?.general)
        setMusic(user?.music)
        setMovies(user?.movies)
        setTelevision(user?.television)
        setBooks(user?.books)
        setHeroes(user?.heroes)
        setInstagram(user.instagram)
        setSnapchat(user.snapchat)
        setTiktok(user.tiktok)
        setTwitter(user.twitter)
        setTwitch(user.twitch)
        setYoutube(user.youtube)
        setSoundcloud(user.soundcloud)
        setSpotify(user.spotify)
        setPintrest(user.pintrest)
        setGithub(user.github)
    }, [user])


    let validate = () => {
        let validationErrors = []

        if ((status && status.length > 100) || (mood && mood.length > 100) || (brief && brief.length > 100)) {
            validationErrors.push('Please keep your status, mood, and brief description less than 100 characters')
        }


        setErrors(validationErrors)

        if (validationErrors.length) setDisplayErrors(true)

        return validationErrors
    }

    useEffect(() => {
        if (displayErrors) {
            validate()
        }
    }, [status, mood, brief])

    const handleSubmit = async (e) => {
        e.preventDefault()

        let validationErrors = validate()
        if (validationErrors.length) return

        if (!errors.length) {
            const payload = {
                status,
                mood,
                brief_you: brief,
                about_me: aboutMe,
                here_for: meet,
                general,
                music,
                movies,
                television,
                books,
                heroes,
                instagram,
                snapchat,
                tiktok,
                twitter,
                twitch,
                youtube,
                soundcloud,
                spotify,
                pintrest,
                github
            }
            const updatedUser = await dispatch(updateUser(payload, userId)).catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
            if (updatedUser) {
                // console.log(updatedUser)
                history.push(`/users/${userId}`)
            }
            return errors
        }
    }

    return (
        <>
            <div className="edit-profile-container">
                <div className="edit-profile-form-container">
                    <h2>Edit Your Profile</h2>
                    <br />
                    <p>All fields are optional and can be left empty if you want.</p>
                    <div className='errors' id='errors-container'>
                            {errors.map((error, ind) => (
                                <div id='error-message' key={ind}>{error}</div>
                            ))}
                        </div>
                    <form onSubmit={handleSubmit}>
                        <div className="edit-profile-form-button">
                            <button id='button' type="submit">Save</button>
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
                        <div className='errors' id='errors-container'>
                            {errors.map((error, ind) => (
                                <div id='error-message' key={ind}>{error}</div>
                            ))}
                        </div>



                        <div className="edit-profile-form-button">
                            <button id='button' type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditStatus
