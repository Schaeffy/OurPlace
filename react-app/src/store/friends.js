const LOAD_ALL = 'friends/LOAD_ALL';
const CREATE = 'friends/CREATE';
const REMOVE = 'friends/REMOVE';
const RESET = 'friends/RESET';

const loadAll = (friends) => ({
    type: LOAD_ALL,
    friends
});

const create = (friend, userId) => ({
    type: CREATE,
    friend,
    userId
});

const remove = (userId) => ({
    type: REMOVE,
    userId
});

export const resetFriends = () => ({
    type: RESET
});

export const getFriends = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/friends`, {
        method: 'GET',
    });

    if (res.ok) {
        const friends = await res.json();
        dispatch(loadAll(friends));
        return friends;
    }
};

export const createFriend = (userId) => async (dispatch) => {
    const res = await fetch(`/api/requests/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        const friend = await res.json();
        dispatch(create(userId));
        return friend;
    }
}

export const deleteFriend = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/unfriend`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const deleted = await res.json();
        dispatch(remove(userId));
        return deleted;
    }
}


const initialState = {
};

const friendsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALL:
            newState = {};
            // console.log('-----------------',action.friends)
            // console.log('-----------------',action.friends.friends)
            action.friends.friends.forEach(friend => {
                newState[friend.id] = friend;
            });
            return newState;
        case CREATE:
            newState = { ...state };
            // console.log('+++++++++++++++++++',action.friend)
            newState[action.friend.id] = action.friend;
            return newState;
        case REMOVE:
            newState = { ...state };
            delete newState[action.friendId];
            return newState;
        case RESET:
            return initialState;
        default:
            return state;
    }
}

// const friendsReducer = (state = initialState, action) => {
//     let newState;
//     switch (action.type) {
//         case LOAD_ALL:
//             newState = Object.assign({}, state);
//             console.log('-----------------',action.friends)
//             action.friends.friends.forEach(friend => {
//                 newState.friends[friend.id] = friend;
//             });
//             return newState;
//         case CREATE:
//             newState = Object.assign({}, state);
//             newState.friends[action.friend.id] = action.friend;
//             return newState;
//         case REMOVE:
//             newState = Object.assign({}, state);
//             delete newState.friends[action.friendId];
//             return newState;
//         default:
//             return state;
//     }
// }



export default friendsReducer;
