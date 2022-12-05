import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { resetSession } from '../../store/session'
import { getOneUser, updateUser, resetUser } from '../../store/users'
import './Edit.css'

const EditLinks = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { userId } = useParams()

    const user = useSelector(state => state.users.user)

    const [loaded, setLoaded] = useState(false)

    // const [instagram, setInstagram] = useState(user?.instagram)
    // const [snapchat, setSnapchat] = useState(user?.snapchat)
    // const [tiktok, setTiktok] = useState(user?.tiktok)
    // const [twitter, setTwitter] = useState(user?.twitter)
    // const [twitch, setTwitch] = useState(user?.twitch)
    // const [youtube, setYoutube] = useState(user?.youtube)
    // const [soundcloud, setSoundcloud] = useState(user?.soundcloud)
    // const [spotify, setSpotify] = useState(user?.spotify)
    // const [pintrest, setPintrest] = useState(user?.pintrest)
    // const [github, setGithub] = useState(user?.github)
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

    const regex = new RegExp("^[A-Za-z0-9_-]*$")
    const regex2 = new RegExp('^(http|https)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,6}(/\S*)?$')

    useEffect(() => {
        dispatch(getOneUser(userId)).then(()=> setLoaded(true))

        return () => {
            dispatch(resetUser())
            // dispatch(getOneUser(userId))
            // dispatch(resetSession())
        }
    }, [dispatch, userId])

    useEffect(() => {
        setPic(user?.profile_img)
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

        if ((instagram && !instagram.match(regex)) || (snapchat && !snapchat.match(regex)) || (tiktok && !tiktok.match(regex)) || (twitter && !twitter.match(regex)) || (twitch && !twitch.match(regex)) || (youtube && !youtube.match(regex)) || (soundcloud && !soundcloud.match(regex)) || (pintrest && !pintrest.match(regex)) || (github && !github.match(regex))) {
            validationErrors.push('Please enter a valid link', 'Only the username is required')
        }

        if (spotify && !regex2.test(spotify)) {
            validationErrors.push('Please enter a https link for Spotify')
        }

        if ((instagram && instagram.length > 100) || (snapchat && snapchat.length > 100) || (tiktok && tiktok.length > 100) || (twitter && twitter.length > 100) || (twitch && twitch.length > 100) || (youtube && youtube.length > 100) || (soundcloud && soundcloud.length > 100) || (spotify && spotify.length > 100) || (pintrest && pintrest.length > 100) || (github && github.length > 100)) {
            validationErrors.push('Please keep links less than 100 characters')
        }


        setErrors(validationErrors)

        if (validationErrors.length) setDisplayErrors(true)

        return validationErrors
    }


    useEffect(() => {
        if (displayErrors) {
            validate()
        }
    }, [instagram, snapchat, tiktok, twitter, twitch, youtube, soundcloud, spotify, pintrest, github])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrors([])
        setDisplayErrors(false)

        let validationErrors = validate()
        if (validationErrors.length) return

        if (!errors.length) {
            const payload = {
                profile_img: pic,
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
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
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
        <> {loaded && (
            <div className="edit-profile-container">
                <div className="edit-profile-form-container">
                    <h2>Edit Your Links</h2>
                    <br />
                    <p>All links are optional and can be left empty if you want.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="edit-profile-form-button">
                            <button id='button' type="submit">Save</button>
                        </div>

                        <div className='links-form'>

                            <div className='links-form-left'>
                                <div className="edit-profile-form-input">
                                    <div id='form-label'>
                                        <label id="form-label">Instagram</label>
                                    </div>
                                    <div className='links-front'>
                                        https://www.instagram.com/
                                    </div>
                                    <input className='edit-links-input' value={instagram} onChange={(e) => setInstagram(e.target.value)}></input>
                                </div>

                                <div className="edit-profile-form-input">
                                    <div id='form-label'>
                                        <label id="form-label">Snapchat</label>
                                    </div>
                                    <div className='links-front'>
                                        https://www.snapchat.com/add/
                                    </div>
                                    <input className='edit-links-input' value={snapchat} onChange={(e) => setSnapchat(e.target.value)}></input>
                                </div>

                                <div className="edit-profile-form-input">
                                    <div id='form-label'>
                                        <label id="form-label">Twitter</label>
                                    </div>
                                    <div className='links-front'>
                                        https://www.twitter.com/
                                    </div>
                                    <input className='edit-links-input' value={twitter} onChange={(e) => setTwitter(e.target.value)}></input>
                                </div>

                                <div className="edit-profile-form-input">
                                    <div id='form-label'>
                                        <label id="form-label">YouTube</label>
                                    </div>
                                    <div className='links-front'>
                                        https://www.youtube.com/@
                                    </div>
                                    <input className='edit-links-input' value={youtube} onChange={(e) => setYoutube(e.target.value)}></input>
                                </div>

                                <div className="edit-profile-form-input">
                                    <div id='form-label'>
                                        <label id="form-label">Twitch</label>
                                    </div>
                                    <div className='links-front'>
                                        https://www.twitch.tv/
                                    </div>
                                    <input className='edit-links-input' value={twitch} onChange={(e) => setTwitch(e.target.value)}></input>
                                </div>
                            </div>


                            <div className='links-form-right'>

                                <div className="edit-profile-form-input">
                                    <div id='form-label'>
                                        <label id="form-label">Tiktok</label>
                                    </div>
                                    <div className='links-front'>
                                        https://www.tiktok.com/@
                                    </div>
                                    <input className='edit-links-input' value={tiktok} onChange={(e) => setTiktok(e.target.value)}></input>
                                </div>

                                <div className="edit-profile-form-input">
                                    <div id='form-label'>
                                        <label id="form-label">SoundCloud</label>
                                    </div>
                                    <div className='links-front'>
                                        https://www.soundcloud.com/
                                    </div>
                                    <input className='edit-links-input' value={soundcloud} onChange={(e) => setSoundcloud(e.target.value)}></input>
                                </div>

                                <div className="edit-profile-form-input">
                                    <div id='form-label'>
                                        <label id="form-label">Spotify</label>
                                    </div>
                                    <div className='links-front'>
                                        Enter your Spotify link:
                                    </div>

                                    <input className='edit-links-input' value={spotify} onChange={(e) => setSpotify(e.target.value)}></input>
                                </div>

                                <div className="edit-profile-form-input">
                                    <div id='form-label'>
                                        <label id="form-label">Pintrest</label>
                                    </div>
                                    <div className='links-front'>
                                        https://www.pintrest.com/
                                    </div>
                                    <input className='edit-links-input' value={pintrest} onChange={(e) => setPintrest(e.target.value)}></input>
                                </div>

                                <div className="edit-profile-form-input">
                                    <div id='form-label'>
                                        <label id="form-label">Github</label>
                                    </div>
                                    <div className='links-front'>
                                        https://www.github.com/
                                    </div>
                                    <input className='edit-links-input' value={github} onChange={(e) => setGithub(e.target.value)}></input>
                                </div>
                            </div>
                            <div className='errors' id='errors-container'>
                                {errors.map((error, ind) => (
                                    <div id='error-message' key={ind}>{error}</div>
                                ))}
                            </div>
                        </div>


                        <div className="edit-profile-form-button">
                            <button id='button' type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
        </>
    )
}

export default EditLinks
