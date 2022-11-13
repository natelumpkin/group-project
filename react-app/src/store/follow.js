const CREATE_FOLLOW = 'follow/CREATE_FOLLOW'
const LOAD_FOLLOWERS = 'follow/LOAD_FOLLOWERS'
const LOAD_FOLLOWING = 'follow/LOAD_FOLLOWING'
const DELETE_FOLLOW = 'follow/DELETE_FOLLOW'

const addFollow = follow => ({
  type: CREATE_FOLLOW
})

const loadFollows = followers => ({
  type: LOAD_FOLLOWERS,
  followers
})

const loadFollowing = following => ({
  type: LOAD_FOLLOWING,
  following
})

const removeFollow = follow => ({
  type: DELETE_FOLLOW,
  follow
})

initialState = { followers: {}, following: {} }

export default followReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FOLLOW:
      return

    case LOAD_FOLLOWERS:
      return

    case LOAD_FOLLOWING:
      return

    case DELETE_FOLLOW:
      return

    default:
      return state
  }
}
