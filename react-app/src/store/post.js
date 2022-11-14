import normalizeData from "../utils/normalize"

const ALL_POSTS = '/posts/all_posts'
const FOLLOWED_POSTS = '/posts/followed_posts'
const USER_POSTS = '/posts/user'
const ADD_POST = '/posts/create_post'
const EDIT_POST = '/posts/edit'
const DELETE_POST = '/posts/delete'
const ADD_MEDIA = '/posts/add_media'

// Action Creators

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

const editPost = (editedPost) => ({
  type: EDIT_POST,
  payload: editedPost
})

const removePost = (postId) => ({
  type: DELETE_POST,
  payload: postId
})

const addMedia = (media) => ({
  type: ADD_MEDIA,
  payload: media
})

// Thunk Action Creators

export const getAllPosts = () => async (dispatch) => {

  const response = await fetch('/api/posts');

  if (response.ok) {
    const allPosts = await response.json()
    dispatch(getPosts(allPosts))
    console.log('all posts data: ', allPosts)
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
  const sessionResponse = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const newPost = await response.json()
    const userData = await sessionResponse.json()
    newPost.User = userData
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

export const updatePost = (postId, postBody) => async dispatch => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(postBody)
  })
  if (response.ok) {
    const newPost = await response.json();
    dispatch(editPost(newPost));
    return newPost;
  } else {
    const errors = await response.json();
    return errors;
  }
}

export const deletePost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    const successMessage = await response.json();
    dispatch(removePost(postId));
    return successMessage;
  } else {
    const errors = await response.json();
    return errors;
  }
}

export const addMediaByPostId = (postId, media) => async dispatch => {
  const response = await fetch(`/api/posts/${postId}/media`, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(media)
  })
  if (response.ok) {
    const newMedia = await response.json()
    dispatch(addMedia(newMedia))
    return newMedia
  } else {
    const errors = await response.json()
    return errors;
  }
}

// Initial State

const initialState = {
  allPosts: {},
  userPosts: {}
}

// Reducer

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_POSTS: {
      const data = normalizeData(action.payload.Posts)
      // console.log('all posts data: ', data)
      const newState = {
        allPosts: data,
        userPosts: {}
      }
      for (let postId in state.userPosts) {
        newState.userPosts[postId] = {
          ...state.userPosts[postId],
          User: {
            ...state.userPosts[postId].User
          }
        }
        const mediaData = state.userPosts[postId].Media
        newState.userPosts[postId].Media = []
        for (let media of mediaData) {
          newState.userPosts[postId].Media.push({...media})
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
          newState.userPosts[postId] = {
            ...state.userPosts[postId],
            User: {
              ...state.userPosts[postId].User
            }
          }
          const mediaData = state.userPosts[postId].Media
          newState.userPosts[postId].Media = []
          for (let media of mediaData) {
            newState.userPosts[postId].Media.push({...media})
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
          newState.allPosts[postId] = {
            ...state.allPosts[postId],
            User: {
              ...state.allPosts[postId].User
            }
          }
          const mediaData = state.allPosts[postId].Media
          newState.allPosts[postId].Media = []
          for (let media of mediaData) {
            newState.allPosts[postId].Media.push({...media})
          }
        }
        return newState;
      }
      case ADD_POST: {
        const post = action.payload
        // console.log(post)
        const newState = {
          allPosts: {},
          userPosts: {}
        }
        for (let postId in state.allPosts) {
          newState.allPosts[postId] = {
            ...state.allPosts[postId],
            User: {
              ...state.allPosts[postId].User
            }
          }
          const mediaData = state.allPosts[postId].Media
          newState.allPosts[postId].Media = []
          for (let media of mediaData) {
            newState.allPosts[postId].Media.push({...media})
          }
        }
        for (let postId in state.userPosts) {
          newState.userPosts[postId] = {
            ...state.userPosts[postId],
            User: {
              ...state.userPosts[postId].User
            }
          }
          const mediaData = state.userPosts[postId].Media
          newState.userPosts[postId].Media = []
          for (let media of mediaData) {
            newState.userPosts[postId].Media.push({...media})
          }
        }

        newState.allPosts[post.id] = {
          ...post,
          Media: [],
          User: {
            following: false,
            id: post.User.id,
            profileImageUrl: post.User.profileImageUrl,
            username: post.User.username
          }
        }

        return newState
      }
      case EDIT_POST: {
        const editedPost = action.payload
        const newState = {
          allPosts: {},
          userPosts: {}
        }
        for (let postId in state.allPosts) {
          newState.allPosts[postId] = {
            ...state.allPosts[postId],
            User: {
              ...state.allPosts[postId].User
            }
          }
          const mediaData = state.allPosts[postId].Media
          newState.allPosts[postId].Media = []
          for (let media of mediaData) {
            newState.allPosts[postId].Media.push({...media})
          }
        }
        for (let postId in state.userPosts) {
          newState.userPosts[postId] = {
            ...state.userPosts[postId],
            User: {
              ...state.userPosts[postId].User
            }
          }
          const mediaData = state.userPosts[postId].Media
          newState.userPosts[postId].Media = []
          for (let media of mediaData) {
            newState.userPosts[postId].Media.push({...media})
          }
        }
        // if post existed on user posts
        if (state.userPosts[editedPost.id]) {
          // Get previous post's userdata and media data
          // spread it into edited post
          // console.log('mediaData: ', mediaData);
          const notes = state.userPosts[editedPost.id].notes
          newState.userPosts[editedPost.id] = editedPost
          newState.userPosts[editedPost.id].notes = notes
          const mediaData = state.userPosts[editedPost.id].Media
          newState.userPosts[editedPost.id].Media = []
          for (let media of mediaData) {
            newState.userPosts[editedPost.id].Media.push({...media})
          }
          const userData = state.userPosts[editedPost.id].User
          newState.userPosts[editedPost.id].User = { ...userData }
        }
        if (state.allPosts[editedPost.id]) {
          const notes = state.allPosts[editedPost.id].notes
          newState.allPosts[editedPost.id] = editedPost
          newState.allPosts[editedPost.id].notes = notes
          const mediaData = state.allPosts[editedPost.id].Media
          newState.allPosts[editedPost.id].Media = []
          for (let media of mediaData) {
            newState.allPosts[editedPost.id].Media.push({...media})
          }
          const userData = state.allPosts[editedPost.id].User
          newState.allPosts[editedPost.id].User = { ...userData }
        }
        return newState;
      }
      case DELETE_POST: {
        const postId = action.payload
        const newState = {
          allPosts: {},
          userPosts: {}
        }
        for (let postId in state.allPosts) {
          newState.allPosts[postId] = {
            ...state.allPosts[postId],
            User: {
              ...state.allPosts[postId].User
            }
          }
          const mediaData = state.allPosts[postId].Media
          newState.allPosts[postId].Media = []
          for (let media of mediaData) {
            newState.allPosts[postId].Media.push({...media})
          }
        }
        for (let postId in state.userPosts) {
          newState.userPosts[postId] = {
            ...state.userPosts[postId],
            User: {
              ...state.userPosts[postId].User
            }
          }
          const mediaData = state.userPosts[postId].Media
          newState.userPosts[postId].Media = []
          for (let media of mediaData) {
            newState.userPosts[postId].Media.push({...media})
          }
        }
        delete newState.userPosts[postId];
        delete newState.allPosts[postId];
        return newState;
      }
      case ADD_MEDIA: {
        // spread all the data from the previous states
        const media = action.payload;
        const postId = media.postId
        const newState = {
          allPosts: {},
          userPosts: {}
        }
        for (let postId in state.allPosts) {
          newState.allPosts[postId] = {
            ...state.allPosts[postId],
            User: {
              ...state.allPosts[postId].User
            }
          }
          const mediaData = state.allPosts[postId].Media
          newState.allPosts[postId].Media = []
          for (let media of mediaData) {
            newState.allPosts[postId].Media.push({...media})
          }
        }
        for (let postId in state.userPosts) {
          newState.userPosts[postId] = {
            ...state.userPosts[postId],
            User: {
              ...state.userPosts[postId].User
            }
          }
          const mediaData = state.userPosts[postId].Media
          newState.userPosts[postId].Media = []
          for (let media of mediaData) {
            newState.userPosts[postId].Media.push({...media})
          }
        }
        newState.allPosts[postId].Media.push(media)
        newState.userPosts[postId].Media.push(media)
        // if the post is in either state, add the media to
        // that post's Media array
        // return new state
        return newState;
      }
    default:
      return state;
  }
}

export default postReducer;
