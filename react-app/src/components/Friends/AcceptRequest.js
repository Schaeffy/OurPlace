import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { createFriend, getFriends, resetFriends } from '../../store/friends'
import { deleteRequest } from '../../store/requests'

export default function AcceptRequest ({requesterId, requestId}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser?.id

    const handleAccept = async (e) => {
        // console.log(id)
        e.preventDefault()
        await dispatch(deleteRequest(requestId))
        await dispatch(createFriend(requesterId))
        await dispatch(resetFriends())
        await dispatch(getFriends(userId))
    }

    return (
        <button id='button' onClick={handleAccept} >Accept</button>
    )
}
