import { useDispatch } from 'react-redux'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { createFriend } from '../../store/friends'
import { deleteRequest } from '../../store/requests'

export default function AcceptRequest ({requesterId, requestId}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleAccept = async (e) => {
        // console.log(id)
        e.preventDefault()
        await dispatch(deleteRequest(requestId))
        await dispatch(createFriend(requesterId))
    }

    return (
        <button id='button' onClick={handleAccept} >Accept</button>
    )
}
