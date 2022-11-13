import normalizeData from '../utils/normalize.js'
// --- CONSTANT TYPES --- \\
const GET_ALL_COMMENTS = 'comments/getAllComments';
const CREATE_COMMENT = 'comments/createComment';
const EDIT_COMMENT = 'comments/editComment';
const DELETE_COMMENT = 'comments/deleteComment';


// --- ACTION CREATORS --- \\
const getAllComments = (comments, postId) => {
  return {
    type: GET_ALL_COMMENTS,
    payload: comments,
    postId: postId,
  }}

const createComment = (newComment) => {
  return {
  type: CREATE_COMMENT,
  payload: newComment,
}}

const editComment = (commentId) => {
  return {
  type: EDIT_COMMENT,
  payload: commentId,
}}

const deleteComment = (commentId) => {
  return {
  type: DELETE_COMMENT,
  payload: commentId,
}}



// --- THUNKS --- \\

//GET -- /posts/:postId/comments
export const grabAllComments = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/comments`);
  console.log(response)
  const data = await response.json();
  console.log(data)
  dispatch(getAllComments(data, postId));
  return response;
}

// --- REDUCER STUFF --- \\

// --- NORMALIZE DATA SPACE --- \\
const initialState = {comments: {}}
const commentNormalizer = (data) => {
  console.log(data)
  const newObj =
    newObj[data.id] = {
      comment: data.comment,
      User: data.User
    }

  return newObj
}


export default function commentReducer(state = initialState, action) {
  const newState = {...state};
  switch(action.type) {
    case GET_ALL_COMMENTS:
      newState.comments = {};
      action.payload.Comments.forEach(
        comment => {
          newState.comments[action.postId] = commentNormalizer(comment)
        }
      )
      return newState;
  default:
    return state;
  }
};
// --- STATE SHAPE DIAGRAM --- \\
// comments: {
//   posts: {
//       <postId>: {
//           <commentId>: {
//               comment: <>,
//               User: {
//                   id: <>,
//                   username: <>,
//                   profileImageUrl: <>
//               }
//           }
//       }
//   }
// },
