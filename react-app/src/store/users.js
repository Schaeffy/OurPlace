const LOAD_ALL = 'users/LOAD_ALL';
const LOAD_CURRENT = 'users/LOAD_CURRENT';
const LOAD_ONE = 'users/LOAD_ONE';
const UPDATE = 'users/UPDATE';
const RESET = 'users/RESET';


const getUsers = (users) => ({
    type: LOAD_ALL,
    users
})

const getUser = (user) => ({
    type: LOAD_ONE,
    user
})

const update = (user) => ({
    type: UPDATE,
    user
})

export const resetUser = () => ({
    type: RESET
})

//   const initialState = { user: null };

// export const loadUsers = () => async (dispatch) => {
//   const res = await fetch('/api/users', {
//     method: 'GET',
//   });
//   if (res.ok) {
//     const users = await res.json();
//     dispatch(getUsers(users));
//   }
// }


const initialState = {
    users: {},
    user: {},
}

export const loadUsers = () => async (dispatch) => {
    const res = await fetch('/api/users', {
        method: 'GET',
    });
    if (res.ok) {
        const users = await res.json();
        dispatch(getUsers(users));
    }
}

export const getOneUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`, {
        method: 'GET',
    });
    if (res.ok) {
        const user = await res.json();
        dispatch(getUser(user));
    }
}

export const updateUser = (user, userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    });
    if (res.ok) {
        const updatedUser = await res.json();
        dispatch(update(updatedUser));
        return updatedUser;
    }
}

export default function usersReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_ALL:
            newState = Object.assign({}, state);
            action.users.users.forEach(user => {
                newState.users[user.id] = user;
            });
            return {
                ...state
            };
        case LOAD_ONE:
            newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;

        case UPDATE:
            newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;

        case RESET:
            return initialState;
        default:
            return state;
    }
}
