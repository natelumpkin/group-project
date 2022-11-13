const CREATE_FOLLOW = 'follow/CREATE_FOLLOW'
const LOAD_FOLLOWS = 'follow/LOAD_FOLLOWS'
const DELETE_FOLLOW = 'follow/DELETE_FOLLOW'

const addFollow = () => ({
  type: CREATE_FOLLOW
})

const loadFollows = () => ({
  type: LOAD_FOLLOWS
})

const removeFollow = () => ({
  type: DELETE_FOLLOW
})

initialState = { followers: {}, following: {} }

export default followReducer = (state = initialState, action) => {
  return state
}
