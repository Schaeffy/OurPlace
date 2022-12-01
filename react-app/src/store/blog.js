const LOAD_ALL = 'blog/LOAD_ALL';
const LOAD_CURRENT = 'blog/LOAD_CURRENT';
const LOAD_ONE = 'blog/LOAD_ONE';
const CREATE = 'blog/CREATE';
const UPDATE = 'blog/UPDATE';
const REMOVE = 'blog/REMOVE';
const RESET = 'blog/RESET';


// ACTION CREATORS --------------------------------

const loadAll = (blogs) => ({
    type: LOAD_ALL,
    blogs,
});

const loadCurrent = (blogs) => ({
    type: LOAD_CURRENT,
    blogs,
});

const loadOne = (blog) => ({
    type: LOAD_ONE,
    blog,
});

const create = (blog) => ({
    type: CREATE,
    blog,
});

const update = (blog) => ({
    type: UPDATE,
    blog,
});

const remove = (blogId) => ({
    type: REMOVE,
    blogId,
});

export const resetBlog = () => ({
    type: RESET,
});


// THUNKS --------------------------------

export const getBlogs = () => async dispatch => {
    const res = await fetch('/api/blogs', {
        method: 'GET',
    });

    if (res.ok) {
        const blogs = await res.json();
        dispatch(loadAll(blogs));
        return blogs
    }
}

export const getUserBlogs = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`, {
        method: 'GET',
    });

    if (res.ok) {
        const blogs = await res.json();
        dispatch(loadCurrent(blogs));
    }
}

export const getOneBlog = (blogId) => async (dispatch) => {
    const res = await fetch(`/api/blogs/${blogId}`, {
        method: 'GET',
    });
    if (res.ok) {
        const blog = await res.json();
        dispatch(loadOne(blog));
    }
}

export const createBlog = (blog) => async (dispatch) => {
    const res = await fetch(`/api/blogs/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
    });
    if (res.ok) {
        const blog = await res.json();
        dispatch(create(blog));
        return blog
    }
}

export const updateBlog = (blog, blogId) => async (dispatch) => {
    const res = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
    });
    if (res.ok) {
        const editedBlog = await res.json();
        dispatch(update(editedBlog));
        return editedBlog
    }
}

export const deleteBlog = (blogId) => async (dispatch) => {
    const res = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        const deleted = await res.json();
        dispatch(remove(blogId));
        return deleted
    }
}

// REDUCER --------------------------------

const initialState = {
    blogs: {},
    singleBlog:{},
    user: {},
}

const blogReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALL:
            newState = Object.assign({}, state);
            action.blogs.blogs.forEach(blog => {
                newState.blogs[blog.id] = blog;
            });
            return newState;
        case LOAD_CURRENT:
            newState = Object.assign({}, state);
            action.blogs.blogs.forEach(blog => {
                newState.user[blog.id] = blog;
            });
            return newState;
        case LOAD_ONE:
            newState = Object.assign({}, state);
            newState.singleBlog = action.blog;
            return newState;
        case CREATE:
            newState = Object.assign({}, state);
            newState.blogs[action.blog.id] = action.blog;
            return newState;
        case UPDATE:
            newState = Object.assign({}, state);
            newState.blogs[action.blog.id] = action.blog;
            return newState;
        case REMOVE:
            newState = Object.assign({}, state);
            // console.log('-----------',action.blogId)
            delete newState.blogs[action.blogId];
            if (newState.singleBlog.id === action.blogId) {
                newState.singleBlog = {};
            }
            return newState;
        case RESET:
            return initialState;
        default:
            return state;
    }
}

export default blogReducer
