import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { resetSession } from '../../store/session'
import { getOneUser, updateUser, resetUser } from '../../store/users'
// import { s3, get_unique_filename, upload_file_to_s3 } from '../'
import defaultPic from '../images/user.png'
import './Edit.css'

// const EditPhoto = () => {
//     const dispatch = useDispatch()
//     const history = useHistory()
//     const { userId } = useParams()

//     const [file, setFile] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [url, setUrl] = useState(null);

//     const user = useSelector(state => state.users.user)

//     const [loaded, setLoaded] = useState(false)

//     // const [instagram, setInstagram] = useState(user?.instagram)
//     // const [snapchat, setSnapchat] = useState(user?.snapchat)
//     // const [tiktok, setTiktok] = useState(user?.tiktok)
//     // const [twitter, setTwitter] = useState(user?.twitter)
//     // const [twitch, setTwitch] = useState(user?.twitch)
//     // const [youtube, setYoutube] = useState(user?.youtube)
//     // const [soundcloud, setSoundcloud] = useState(user?.soundcloud)
//     // const [spotify, setSpotify] = useState(user?.spotify)
//     // const [pintrest, setPintrest] = useState(user?.pintrest)
//     // const [github, setGithub] = useState(user?.github)

//     const [pic, setPic] = useState('')
//     const [status, setStatus] = useState('')
//     const [mood, setMood] = useState('')
//     const [brief, setBrief] = useState('')
//     const [aboutMe, setAboutMe] = useState('')
//     const [meet, setMeet] = useState('')
//     const [general, setGeneral] = useState('')
//     const [music, setMusic] = useState('')
//     const [movies, setMovies] = useState('')
//     const [television, setTelevision] = useState('')
//     const [books, setBooks] = useState('')
//     const [heroes, setHeroes] = useState('')
//     const [instagram, setInstagram] = useState('')
//     const [snapchat, setSnapchat] = useState('')
//     const [tiktok, setTiktok] = useState('')
//     const [twitter, setTwitter] = useState('')
//     const [twitch, setTwitch] = useState('')
//     const [youtube, setYoutube] = useState('')
//     const [soundcloud, setSoundcloud] = useState('')
//     const [spotify, setSpotify] = useState('')
//     const [pintrest, setPintrest] = useState('')
//     const [github, setGithub] = useState('')

//     const [displayErrors, setDisplayErrors] = useState(false)
//     const [errors, setErrors] = useState([])

//     const regex = new RegExp("http(|s):.*\.(jpg|png|jpeg|gif)")


    // useEffect(() => {
    //     dispatch(getOneUser(userId)).then(() => setLoaded(true))

    //     return () => {
    //         dispatch(resetUser())
    //         // dispatch(getOneUser(userId))
    //         // dispatch(resetSession())
    //     }
    // }, [dispatch, userId])

//     // useEffect(() => {
//     //     setPic(user.profile_img)
//     // }, [user])

//     useEffect(() => {
//         setPic(user?.profile_img)
//         setStatus(user?.status)
//         setMood(user?.mood)
//         setBrief(user?.brief_you)
//         setAboutMe(user?.about_me)
//         setMeet(user?.here_for)
//         setGeneral(user?.general)
//         setMusic(user?.music)
//         setMovies(user?.movies)
//         setTelevision(user?.television)
//         setBooks(user?.books)
//         setHeroes(user?.heroes)
//         setInstagram(user.instagram)
//         setSnapchat(user.snapchat)
//         setTiktok(user.tiktok)
//         setTwitter(user.twitter)
//         setTwitch(user.twitch)
//         setYoutube(user.youtube)
//         setSoundcloud(user.soundcloud)
//         setSpotify(user.spotify)
//         setPintrest(user.pintrest)
//         setGithub(user.github)
//     }, [user])


//     let validate = () => {
//         let validationErrors = []

//         if (pic && !regex.test(pic)) {
//             validationErrors.push('Please enter a valid image url', '(ends in .jpg, .png, or .gif)')
//         }



//         setErrors(validationErrors)

//         if (validationErrors.length) setDisplayErrors(true)

//         return validationErrors
//     }


//     useEffect(() => {
//         if (displayErrors) {
//             validate()
//         }

//     }, [pic])

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         setErrors([])
//         setDisplayErrors(false)

//         let validationErrors = validate()
//         if (validationErrors.length) return

//         if (!pic) {
//             setPic('https://i.imgur.com/pEk7MNs.png')
//         }

//         if (!errors.length) {
//             const payload = {
//                 profile_img: pic,
//                 status,
//                 mood,
//                 brief_you: brief,
//                 about_me: aboutMe,
//                 here_for: meet,
//                 general,
//                 music,
//                 movies,
//                 television,
//                 books,
//                 heroes,
//                 instagram,
//                 snapchat,
//                 tiktok,
//                 twitter,
//                 twitch,
//                 youtube,
//                 soundcloud,
//                 spotify,
//                 pintrest,
//                 github
//             }
//             const updatedUser = await dispatch(updateUser(payload, userId)).catch(async (res) => {
//                 const data = await res.json();
//                 if (data && data.errors) setErrors(data.errors);
//             });
//             if (updatedUser) {
//                 // console.log(updatedUser)
//                 history.push(`/`)
//             }
//             return errors
//         }
//         // if (user) {
//         //     return <Redirect to='/' />;
//         //   }
//     }

//     const handleCancel = async (e) => {
//         e.preventDefault()
//         history.goBack()
//     }

//     // const handleRemove = async (e) => {
//     //     e.preventDefault()
//     //     await dispatch(updateUser(
//     //         {
//     //             profile_img: 'https://i.imgur.com/pEk7MNs.png',
//     //             status,
//     //             mood,
//     //             brief_you: brief,
//     //             about_me: aboutMe,
//     //             here_for: meet,
//     //             general,
//     //             music,
//     //             movies,
//     //             television,
//     //             books,
//     //             heroes,
//     //             instagram,
//     //             snapchat,
//     //             tiktok,
//     //             twitter,
//     //             twitch,
//     //             youtube,
//     //             soundcloud,
//     //             spotify,
//     //             pintrest,
//     //             github
//     //         }, userId))
//     //     history.push(`/`)
//     // }


//     return (
//         <> {loaded && (
//             <div className="edit-profile-container">
//                 <div className="edit-pic-form-container">
//                     <h2>Add or Edit Your Profile Picture</h2>
//                     <br />
//                     <p>Profile picture is optional.</p>
//                     <form id='edit-pic-form' onSubmit={handleSubmit}>

//                         <div className='pics-form-left'>
//                             <div className="edit-profile-form-input">
//                                 <div id='form-label'>
//                                     {/* <label id="form-label">Profile Picture</label> */}
//                                 </div>
//                                 <div className='profile-img-edit-container'>
//                                     <img className='profile-img-edit' src={user?.profile_img ? user?.profile_img : defaultPic} alt="profile" />
//                                 </div>
//                                 <div id='add-link-text'>
//                                     Enter an image link. <br />
//                                     It should be a https link that ends in .jpg, .png, or .gif
//                                 </div>
//                                 <div>

//                                     <input className='edit-image-input' value={pic} onChange={(e) => setPic(e.target.value)}></input>
//                                 </div>
//                             </div>
//                             <div className="edit-pic-button">
//                                 <button id='button' type="submit">Save</button>
//                                 <button id='button' onClick={handleCancel}>Cancel</button>
//                             </div>
//                         </div>
//                         <div className='right-side-container'>
//                             <div className='pic-rules-container'>
//                                 <div className='pic-rules'>
//                                     <div>Square pictures work best</div>
//                                     <div>No explicit content</div>
//                                 </div>

//                             </div>
//                             <div className='errors' id='errors-container'>
//                                 {errors.map((error, ind) => (
//                                     <div id='error-message' key={ind}>{error}</div>
//                                 ))}
//                             </div>

//                         </div>
//                     </form>
//                     {/* <div className='remove-profile-pic'>
//                         <h3>Remove Profile Picture</h3>
//                         <p>Click the button below to remove your profile picture.</p>
//                         <button className='button' id='remove' onClick={handleRemove}>Remove Picture</button>
//                     </div> */}
//                 </div>


//             </div>
//         )}
//         </>
//     )
// }

// export default EditPhoto


const EditPhoto = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const dispatch = useDispatch()


    // const user = useSelector(state => state.session.user)
    const user = useSelector(state => state.users.user)
    const { userId } = useParams()

    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [loaded, setLoaded] = useState(false)

        useEffect(() => {
        dispatch(getOneUser(userId)).then(() => setLoaded(true))

        return () => {
            dispatch(resetUser())
            // dispatch(getOneUser(userId))
            // dispatch(resetSession())
        }
    }, [dispatch, userId])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch('/api/images', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            history.push("/");
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            // console.log("error");
        }
    }

        const handleCancel = async (e) => {
        e.preventDefault()
        history.goBack()
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }


    return (loaded &&
        <>
            <div className="edit-profile-container">
                <div className="edit-pic-form-container">
                    <h2>Add or Edit Your Profile Picture</h2>
                    <br />
                    <p>Profile picture is optional.</p>
                    <form id='edit-pic-form' onSubmit={handleSubmit}>

                        <div className='pics-form-left'>
                            <div className="edit-profile-form-input">
                                <div id='form-label'>
                                    {/* <label id="form-label">Profile Picture</label> */}
                                </div>
                                <div className='profile-img-edit-container'>
                                    <img className='profile-img-edit' src={user?.profile_pic.url ? user?.profile_pic.url : defaultPic} alt="profile" />
                                </div>
                                {/* <div id='add-link-text'>
                                    Enter an image link. <br />
                                    It should be a https link that ends in .jpg, .png, or .gif
                                </div> */}
                                <div>

                                    <input className='edit-image-input' type="file" accept="image/*" onChange={updateImage}></input>
                                </div>
                            {(imageLoading) && <p>Loading...</p>}
                            </div>
                            <div className="edit-pic-button">
                                <button id='button' type="submit">Save</button>
                                <button id='button' onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                        <div className='right-side-container'>
                            <div className='pic-rules-container'>
                                <div className='pic-rules'>
                                    <div>Square pictures work best</div>
                                    <div>No explicit content</div>
                                </div>

                            </div>
                            {/* <div className='errors' id='errors-container'>
                                {errors.map((error, ind) => (
                                    <div id='error-message' key={ind}>{error}</div>
                                ))}
                            </div> */}

                        </div>
                    </form>
                    {/* <div className='remove-profile-pic'>
                        <h3>Remove Profile Picture</h3>
                        <p>Click the button below to remove your profile picture.</p>
                        <button className='button' id='remove' onClick={handleRemove}>Remove Picture</button>
                    </div> */}
                </div>


            </div>
        </>
    )

}

export default EditPhoto;
