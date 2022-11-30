const LOAD_ALL = 'comments/LOAD_ALL';
const LOAD_CURRENT = 'comments/LOAD_CURRENT';
const LOAD_ONE = 'comments/LOAD_ONE';
const CREATE = 'comments/CREATE';
const UPDATE = 'comments/UPDATE';
const REMOVE = 'comments/REMOVE';
const RESET = 'comments/RESET';


// ACTION CREATORS --------------------------------

const loadAll = (comments) => ({
    type: LOAD_ALL,
    comments,
});

const loadCurrent = (comments) => ({
    type: LOAD_CURRENT,
    comments,
});

const loadOne = (comment) => ({
    type: LOAD_ONE,
    comment,
});

const create = (comment, userId) => ({
    type: CREATE,
    comment,
    userId,
});

const update = (comment) => ({
    type: UPDATE,
    comment,
});

const remove = (commentId) => ({
    type: REMOVE,
    commentId,
});

export const resetComment = () => ({
    type: RESET,
});


// THUNKS --------------------------------

export const getComments = () => async (dispatch) => {
    const res = await fetch(`/api/comments`, {
        method: 'GET',
});

    if (res.ok) {
        const comments = await res.json();
        dispatch(loadAll(comments));
        return comments
    }
}

export const getOneComment = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'GET',
    });

    if (res.ok) {
        const comment = await res.json();
        dispatch(loadOne(comment));
    }
}



export const createComment = (comment, userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/comments/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });
    if (res.ok) {
        const comment = await res.json();
        dispatch(create(comment, userId));
        return comment;
    }
}

export const editComment = (userId, comment) => {
    return async (dispatch) => {
        const res = await fetch(`/api/comments/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });
        if (res.ok) {
            const data = await res.json();
            dispatch(update(data));
        }
    };
}

export const deleteComment = (commentId) => async dispatch => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        dispatch(remove(commentId));
    }
}


// REDUCER --------------------------------

const initialState = {
    comments: {},
    singleComment:{},
    user: {},
};

const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALL:
            newState = Object.assign({}, state);
            action.comments.comments.forEach(comment => {
                newState.comments[comment.id] = comment;
            });
            return newState;
        case LOAD_CURRENT:
            newState = Object.assign({}, state);
            action.comments.forEach(comment => {
                newState.comments[comment.id] = comment;
            });
            return newState;
        case LOAD_ONE:
            newState = Object.assign({}, state);
            newState.singleComment = action.comment;
            return newState;
        case CREATE:
            newState = Object.assign({}, state);
            newState.comments[action.comment.id] = action.comment;
            return newState;
        case UPDATE:
            newState = Object.assign({}, state);
            newState.comments[action.comment.id] = action.comment;
            return newState;
        case REMOVE:
            newState = Object.assign({}, state);
            delete newState.comments[action.commentId];
            return newState;
        case RESET:
            return initialState;
        default:
            return state;
    }
}

export default commentReducer;
