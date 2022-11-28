const LOAD_ALL = 'users/LOAD_ALL';
const LOAD_CURRENT = 'users/LOAD_CURRENT';
const LOAD_ONE = 'users/LOAD_ONE';


const getUsers = (users) => ({
    type: LOAD_ALL,
    users
})

const getUser = (user) => ({
    type: LOAD_ONE,
    user
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
    user: null,
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
    const res = await fetch(`/api/${userId}`, {
        method: 'GET',
    });
    if (res.ok) {
        const user = await res.json();
        dispatch(getUser(user));
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
        default:
            return state;
    }
}
