const LOAD_ALL = 'users/LOAD_ALL';
const LOAD_CURRENT = 'users/LOAD_CURRENT';
const LOAD_ONE = 'users/LOAD_ONE';


const getUsers = (users) => ({
    type: LOAD_ALL,
    users
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
        default:
            return state;
    }
}
