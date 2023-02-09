import { useDispatch } from 'react-redux'
import { useHistory, useParams, Redirect } from 'react-router-dom'
import { deleteRequest } from '../../store/requests'

export default function DeleteRequest ({id}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = async (e) => {
        // console.log(id)
        e.preventDefault()
        await dispatch(deleteRequest(id))
    }

    return (
        <button id='button' onClick={handleDelete}>Decline</button>
    )
}
