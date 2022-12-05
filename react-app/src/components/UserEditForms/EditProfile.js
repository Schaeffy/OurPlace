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

    const user = useSelector(state => state.session.user)

    const [aboutMe, setAboutMe] = useState(user?.about_me)
    const [meet, setMeet] = useState(user?.meet)
    const [general, setGeneral] = useState(user?.general)
    const [music, setMusic] = useState(user?.music)
    const [movies, setMovies] = useState(user?.movies)
    const [television, setTelevision] = useState(user?.television)
    const [books, setBooks] = useState(user?.books)
    const [heroes, setHeroes] = useState(user?.heroes)

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
            about_me: aboutMe,
            here_for: meet,
            general,
            music,
            movies,
            television,
            books,
            heroes
        }
        const updatedUser = await dispatch(updateUser(payload, userId))
        if (updatedUser) {
            // console.log(updatedUser)
            history.push(`/`)
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
