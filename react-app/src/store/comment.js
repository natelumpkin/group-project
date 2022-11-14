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

const createComment = (newComment, postId) => {
  return {
  type: CREATE_COMMENT,
  payload: newComment,
  postId: postId,
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
  const data = await response.json();
  dispatch(getAllComments(data, postId));
  return response;
}


//POST -- /posts/:postId/comments
export const createPostComment = (comment, postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      comment: comment
    }),
  });
  const data = await response.json();
  dispatch(createComment(data, postId));
  return response;
};

// --- REDUCER STUFF --- \\

// --- NORMALIZE DATA SPACE --- \\
const initialState = {comments: {}}
const commentNormalizer = (data) => {
  console.log(data)
  let newObj = {}

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
      newState.posts = {};
      action.payload.Comments.forEach(
        comment => {
          newState.posts[action.postId] = commentNormalizer(comment)
        }
      )
      return newState;
    case CREATE_COMMENT:
      console.log(state)
      action.payload["User"] = state.session.user
      newState.posts[action.postId] = commentNormalizer(action.payload)

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
