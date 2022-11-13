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

const getUserPosts = (posts) => ({
  type: USER_POSTS,
  payload: posts
})

const addPost = (post) => ({
  type: ADD_POST,
  payload: post
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
    // console.log(followedPosts);
    dispatch(getFollowedPosts(followedPosts))
    return followedPosts
  } else {
    return ['Unable to fetch feed.']
  }
}

export const getBlog = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/posts`)

  if (response.ok) {
    const userPosts = await response.json()
    dispatch(getUserPosts(userPosts))
    return userPosts
  } else {
    return ["Unable to fetch user's posts"]
  }
}

// updates allPosts to include the new post
// if user is already on their own feed,
// dispatch get userposts from the post form

export const createPost = (postData) => async (dispatch) => {
  console.log(postData)
  const response = await fetch('/api/posts/', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {"Content-Type": "application/json"}
  });
  if (response.ok) {
    const newPost = await response.json()
    dispatch(addPost(newPost))
    return newPost
  } else {
    const errors = await response.json()
    return errors;
  }
}

const demoPost = {
  postType: "video",
  title: "How to Use Flask With React",
  text: "In 24 short weeks"
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
        userPosts: {}
      }
      for (let postId in state.userPosts) {
        console.log(postId)
        newState.userPosts[postId] = {
          ...state.userPosts[postId],
          User: {
            ...state.userPosts[postId].User
          },
          Media: [
            ...state.userPosts[postId].Media
          ]
        }
      }

      return newState;
    }
      case FOLLOWED_POSTS: {
        const data = normalizeData(action.payload.Posts)
        const newState = {
          allPosts: data,
          userPosts: {}
        }
        for (let postId in state.userPosts) {
          console.log(postId)
          newState.userPosts[postId] = {
            ...state.userPosts[postId],
            User: {
              ...state.userPosts[postId].User
            },
            Media: [
              ...state.userPosts[postId].Media
            ]
          }
        }
        return newState;
      }
      case USER_POSTS: {
        const data = normalizeData(action.payload.Posts)
        const newState = {
          allPosts: {},
          userPosts: data
        }
        for (let postId in state.allPosts) {
          console.log(postId)
          newState.allPosts[postId] = {
            ...state.allPosts[postId],
            User: {
              ...state.allPosts[postId].User
            },
            Media: [
              ...state.allPosts[postId].Media
            ]
          }
        }
        return newState;
      }
      case ADD_POST: {
        const post = action.payload
        console.log(post)
        const newState = {
          allPosts: {},
          userPosts: {}
        }
        for (let postId in state.allPosts) {
          console.log(postId)
          newState.allPosts[postId] = {
            ...state.allPosts[postId],
            User: {
              ...state.allPosts[postId].User
            },
            Media: [
              ...state.allPosts[postId].Media
            ]
          }
        }
        for (let postId in state.userPosts) {
          console.log(postId)
          newState.userPosts[postId] = {
            ...state.userPosts[postId],
            User: {
              ...state.userPosts[postId].User
            },
            Media: [
              ...state.userPosts[postId].Media
            ]
          }
        }
        newState.allPosts[post.id] = post
        return newState
      }
    default:
      return state;
  }
}

export default postReducer;
