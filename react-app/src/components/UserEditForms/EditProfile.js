import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { resetSession } from '../../store/session'
import { getOneUser, updateUser, resetUser } from '../../store/users'
import './Edit.css'

const EditProfile = () => {
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

        if ((aboutMe && aboutMe.length > 3000) || (meet && meet.length > 3000) || (general && general.length > 3000) || (music && music.length > 3000) || (movies && movies.length > 3000) || (television && television.length > 3000) || (books && books.length > 3000) || (heroes && heroes.length > 3000)) {
            validationErrors.push('Please keep all text fields less than 3000 characters')
        }

        setErrors(validationErrors)

        if (validationErrors.length) setDisplayErrors(true)

        return validationErrors
    }

    useEffect(() => {
        if (displayErrors) {
            validate()
        }
    }, [aboutMe, meet, general, music, movies, television, books, heroes])



    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrors([])
        setDisplayErrors(false)

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
                history.push(`/`)
            }
            return errors
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
                                Blurbs:
                            </div>

                            <div id='form-label'>
                                <label id="form-label">About Me</label>
                            </div>

                            <textarea className='edit-profile-textarea' value={aboutMe} onChange={(e) => setAboutMe(e.target.value)}></textarea>
                        </div>

                        <div className="edit-profile-form-input">
                            <div id='form-label'>
                                <label id="form-label">Meet</label>
                            </div>
                            <textarea className='edit-profile-textarea' value={meet} onChange={(e) => setMeet(e.target.value)}></textarea>
                        </div>

                        <div id='category'>
                            Interests:
                        </div>

                        <div className="edit-profile-form-input">
                            <div id='form-label'>
                                <label id="form-label">General</label>
                            </div>
                            <textarea className='edit-profile-textarea' value={general} onChange={(e) => setGeneral(e.target.value)}></textarea>
                        </div>

                        <div className="edit-profile-form-input">
                            <div id='form-label'>
                                <label id="form-label">Music</label>
                            </div>
                            <textarea className='edit-profile-textarea' value={music} onChange={(e) => setMusic(e.target.value)}></textarea>
                        </div>

                        <div className="edit-profile-form-input">
                            <div id='form-label'>
                                <label id="form-label">Movies</label>
                            </div>
                            <textarea className='edit-profile-textarea' value={movies} onChange={(e) => setMovies(e.target.value)}></textarea>
                        </div>

                        <div className="edit-profile-form-input">
                            <div id='form-label'>
                                <label id="form-label">Television</label>
                            </div>
                            <textarea className='edit-profile-textarea' value={television} onChange={(e) => setTelevision(e.target.value)}></textarea>
                        </div>

                        <div className="edit-profile-form-input">
                            <div id='form-label'>
                                <label id="form-label">Books</label>
                            </div>
                            <textarea className='edit-profile-textarea' value={books} onChange={(e) => setBooks(e.target.value)}></textarea>
                        </div>

                        <div className="edit-profile-form-input">
                            <div id='form-label'>
                                <label id="form-label">Heroes</label>
                            </div>
                            <textarea className='edit-profile-textarea' value={heroes} onChange={(e) => setHeroes(e.target.value)}></textarea>
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

export default EditProfile
