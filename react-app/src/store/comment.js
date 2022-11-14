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

const editComment = (data, userData) => {
  return {
  type: EDIT_COMMENT,
  payload: data,
  user: userData,
}}

const deleteComment = (data) => {
  return {
  type: DELETE_COMMENT,
  payload: data,
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
export const editPostComment = (commentId, comment, userData) => async (dispatch) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify({
      "comment": comment
    })
  }

  const response = await fetch(`/comments/${commentId}`, options)

  if (response.ok) {
    const data = await response.json();
    dispatch(editComment(data, userData))
    return response
  }
}

//DELETE -URL: /comments/:commentId
export const deletePostComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
  dispatch(deleteComment());
  }

  return response;
};


// --- REDUCER STUFF --- \\

// --- NORMALIZE DATA SPACE --- \\
const initialState = {}
const commentNormalizer = (data) => {
  return {
      comment: data.comment,
      User: data.User
    }
  }


export default function commentReducer(state = initialState, action) {
  const newState = {...state};
  switch(action.type) {
    case GET_ALL_COMMENTS:
      action.payload.Comments.forEach(
        comment => {
          newState.posts[action.postId] = {[String(comment.id)]: commentNormalizer(comment)}
        }
      )
      return newState;
    case CREATE_COMMENT:
      newState.posts[action.payload.postId][action.payload.id] = {
        comment: action.payload.comment,
        User: action.user
      }

    case DELETE_COMMENT:
      delete newState.posts[action.payload.postId][action.payload.id]
      return newState

    case EDIT_COMMENT:
        newState.posts[action.payload.postId][action.payload.id] = {
          comment: action.payload.comment,
          User: action.user
        }
       return newState
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
