const LOAD_ALL = 'requests/LOAD_ALL';
const CREATE = 'requests/CREATE';
const REMOVE = 'requests/REMOVE';
const RESET = 'requests/RESET';

const loadAll = (requests) => ({
    type: LOAD_ALL,
    requests
});

const create = (request, userId) => ({
    type: CREATE,
    request,
    userId
});

const remove = (requestId) => ({
    type: REMOVE,
    requestId
});

export const resetRequests = () => ({
    type: RESET
});

export const getRequests = () => async (dispatch) => {
    const res = await fetch('/api/requests', {
        method: 'GET',
    });

    if (res.ok) {
        const requests = await res.json();
        dispatch(loadAll(requests));
        return requests;
    }
};

export const createRequest = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/befriend`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (res.ok) {
        const newRequest = await res.json();
        dispatch(create(newRequest, userId));
        return newRequest;
    }
}

export const deleteRequest = (requestId) => async (dispatch) => {
    const res = await fetch(`/api/requests/${requestId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const deleted = await res.json();
        dispatch(remove(requestId));
        return deleted;
    }
}

const initialState = {};

const requestsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALL:
            newState = {};
            action.requests.requests.forEach(request => {
                newState[request.id] = request;
            });
            return newState;
        case CREATE:
            newState = { ...state };
            newState[action.request.id] = action.request;
            return newState;
        case REMOVE:
            newState = { ...state };
            delete newState[action.requestId];
            return newState;
        case RESET:
            return initialState;
        default:
            return state;
    }
}

export default requestsReducer;
