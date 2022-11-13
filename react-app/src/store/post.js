import normalizeData from "../utils/normalize"

const ALL_POSTS = '/posts/all_posts'
const FOLLOWED_POSTS = '/posts/followed_posts'
const USER_POSTS = '/posts/user'
const ADD_POST = '/posts/create_post'
const EDIT_POST = '/posts/edit'
const DELETE_POST = '/posts/delete'
const ADD_MEDIA = '/posts/add_media'

// Thunks

const getPosts = (posts) => ({
  type: ALL_POSTS,
  payload: posts
})

const getFollowedPosts = (posts) => ({
  type: FOLLOWED_POSTS,
  payload: posts
})

// Thunk Action Creators

export const getAllPosts = () => async (dispatch) => {

  const response = await fetch('/api/posts');

  if (response.ok) {
    const allPosts = await response.json()
    dispatch(getPosts(allPosts))
    return allPosts
  } else {
    return ['Unable to fetch all posts.']
  }
}

export const getFeed = () => async (dispatch) => {
  const response = await fetch('/api/posts/following');

  if (response.ok) {
    const followedPosts = await response.json()
    console.log(followedPosts);
    dispatch(getFollowedPosts(followedPosts))
    return followedPosts
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

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_POSTS: {
      const data = normalizeData(action.payload.Posts)
      const newState = {
        allPosts: data,
        userPosts: {
          ...state.userPosts
        }
      }
      return newState;
    }
      case FOLLOWED_POSTS: {
        const data = normalizeData(action.payload.Posts)
        const newState = {
          allPosts: data,
          userPosts: {
            ...state.userPosts
          }
        }
        return newState;
      }
    default:
      return state;
  }
}

export default postReducer;
