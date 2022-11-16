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

const createComment = (newComment, userData) => {
  return {
  type: CREATE_COMMENT,
  payload: newComment,
  user: userData,
}}

const editComment = (data, commentId, postId, userData) => {
  return {
  type: EDIT_COMMENT,
  payload: data,
  user: userData,
  postId: postId,
  commentId: commentId,
}}

const deleteComment = (data, commentId) => {
  return {
  type: DELETE_COMMENT,
  payload: data,
  commentId: commentId,
}}



// --- THUNKS --- \\

//GET -- /posts/:postId/comments
export const grabAllComments = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/comments`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllComments(data, postId));
    return response;
  }
}


//POST -- /posts/:postId/comments
export const createPostComment = (comment, postId, userData) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/comments`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      "comment": comment
    }),
  });

  if (response.ok) {
    const data = await response.json()
    dispatch(createComment(data, userData));
    return data
  }
};


//PUT --  /comments/:commentId
export const editPostComment = (commentId, postId, comment, userData) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'PUT',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      "comment": comment
    })
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(editComment(data, commentId, postId, userData))
    return response
  }
}

//DELETE -URL: /comments/:commentId
export const deletePostComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteComment(data, commentId));
  }

  return response;
};


// --- REDUCER STUFF --- \\

// --- NORMALIZE DATA SPACE --- \\
const initialState = {posts: {}}
const commentNormalizer = (data) => {
  return {
      comment: data.comment,
      User: data.User
    }
  }


export default function commentReducer(state = initialState, action) {
  let newState = {...state};
  switch(action.type) {
    case GET_ALL_COMMENTS:
    let data = normalizeData(action.payload.Comments)
    newState.posts[action.postId] = data

    return newState
    case CREATE_COMMENT:
      newState.posts[action.payload.postId][action.payload.id] = {
        comment: action.payload.comment,
        User: action.user
      }
      return newState;
    case DELETE_COMMENT:
      delete newState.posts[action.payload.postId][action.commentId]
      return newState

    case EDIT_COMMENT:
      let newdata = normalizeData(action.payload)
      // console.log("Test", newdata)
      // console.log("Test", action.payload)
      newdata.User = action.user
       newState.posts[action.postId][action.commentId] = newdata
       return newState
  default:
    return state;
  }
};
// --- STATE SHAPE DIAGRAM --- \\
// comments: {
//   posts: {
//       {PostId} 1: {
//          {COMMENTID} 1: {
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
