import normalizeData from "../utils/normalize"

const CREATE_FOLLOW = 'follow/CREATE_FOLLOW'
const LOAD_FOLLOWERS = 'follow/LOAD_FOLLOWERS'
const LOAD_FOLLOWING = 'follow/LOAD_FOLLOWING'
const DELETE_FOLLOW = 'follow/DELETE_FOLLOW'

export const addFollow = follow => ({
  type: CREATE_FOLLOW,
  follow
})

export const loadFollows = followers => ({
  type: LOAD_FOLLOWERS,
  followers
})

export const loadFollowing = following => ({
  type: LOAD_FOLLOWING,
  following
})

export const removeFollow = follow => ({
  type: DELETE_FOLLOW,
  follow
})



initialState = { followers: {}, following: {} }

const followReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FOLLOW:
      const normalizedFollow = normalizeData(action.follow)
      return { followers: { ...state.followers }, following: { ...state.following, normalizedFollow } }

    case LOAD_FOLLOWERS:
      const normalizedFollowers = normalizeData(action.followers)
      return { followers: { normalizedFollowers }, following: { ...state.following } }

    case LOAD_FOLLOWING:
      const normalizedFollowing = normalizeData(action.following)
      return { followers: { ...state.followers }, following: { normalizedFollowing } }

    case DELETE_FOLLOW:
      delete state.following[action.follow]
      return { ...state }

    default:
      return state
  }
}

export default followReducer
