
const ALL_POSTS = '/posts/all_posts'
const FOLLOWED_POSTS = '/posts/followed_posts'
const USER_POSTS = '/posts/user'
const ADD_POST = '/posts/create_post'
const EDIT_POST = '/posts/edit'
const DELETE_POST = '/posts/delete'
const ADD_MEDIA = '/posts/add_media'

// Thunks

const getPosts = () => ({
  type: ALL_POSTS
})

// Thunk Action Creators

export const getAllPosts = () => async (dispatch) => {
  const response = await fetch('/api/posts');

  if (response.ok) {
    const data = await response.json()
    dispatch(getPosts())
    return data
  } else {
    return ['Unable to fetch all posts.']
  }
}

// Initial State

const initialState = {
  allPosts: [],
  userPosts: []
}

// Reducer

export default postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_POSTS:

    default:
      return state;
  }
}
