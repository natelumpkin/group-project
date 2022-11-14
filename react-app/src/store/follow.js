import normalizeData from "../utils/normalize"

const CREATE_FOLLOW = 'follow/CREATE_FOLLOW'
const LOAD_FOLLOWERS = 'follow/LOAD_FOLLOWERS'
const LOAD_FOLLOWING = 'follow/LOAD_FOLLOWING'
const DELETE_FOLLOW = 'follow/DELETE_FOLLOW'

const addFollow = followedUser => ({
  type: CREATE_FOLLOW,
  followedUser
})

const loadFollowers = followers => ({
  type: LOAD_FOLLOWERS,
  followers
})

const loadFollowing = following => ({
  type: LOAD_FOLLOWING,
  following
})

const removeFollow = followedUserId => ({
  type: DELETE_FOLLOW,
  followedUserId
})

export const createNewFollow = (followedUser) => async dispatch => {
  const response = await fetch(`/api/users/${followedUser.id}/followers`, { method: 'POST' })

  if (response.ok) {
    await response.json()
    dispatch(addFollow(followedUser))
  }
}

export const getAllFollowers = (userId) => async dispatch => {

  const response = await fetch(`/api/users/${userId}/followers`)

  if (response.ok) {
    const followers = await response.json()
    dispatch(loadFollowers(followers))
  }
}

export const getAllFollowing = (userId) => async dispatch => {
  const response = await fetch(`/api/users/${userId}/following`)

  if (response.ok) {
    const following = await response.json()
    dispatch(loadFollowing(following))
  }
}

export const deleteFollow = (followedUserId) => async dispatch => {
  const response = await fetch(`/api/users/${followedUserId}/followers`, { method: 'DELETE' })

  if (response.ok) {
    await response.json()
    dispatch(removeFollow(followedUserId))
  }
}

const initialState = { followers: {}, following: {} }

const followReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FOLLOW:
      state.following[action.followedUser.id] = action.followedUser
      return { ...state }

    case LOAD_FOLLOWERS:
      const normalizedFollowers = normalizeData(action.followers.Followers)
      return { followers: { ...normalizedFollowers }, following: { ...state.following } }

    case LOAD_FOLLOWING:
      const normalizedFollowing = normalizeData(action.following.Following)
      return { followers: { ...state.followers }, following: { ...normalizedFollowing } }

    case DELETE_FOLLOW:
      delete state.following[action.followedUserId]
      return { ...state }

    default:
      return state
  }
}

export default followReducer
