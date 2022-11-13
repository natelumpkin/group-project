// --- CONSTANT TYPES --- \\
const GET_ALL_COMMENTS = 'comments/getAllComments';
const CREATE_COMMENT = 'comments/createComment';
const EDIT_COMMENT = 'comments/editComment';
const DELETE_COMMENT = 'comments/deleteComment';


// --- ACTION CREATORS --- \\
const getAllComments = (comments) => {{
    type: GET_ALL_COMMENTS,
    payload: comments,
  }}

const createComment = (newComment) => {{
  type: CREATE_COMMENT,
  payload: newComment,
}}

const editComment = (commentId) => {{
  type: EDIT_COMMENT,
  payload: commentId,
}}

const deleteComment = (commentId) => {{
  type: DELETE_COMMENT,
  payload: commentId,
}}



// --- THUNKS --- \\

//GET -- /posts/:postId/comments

expost const grabAllComments = (postid) => async (dispatch) = {
  const response = await fetch(`/posts/${postId}/comments`);
  const data = await response.json();
  dispatch(getAllComments(data));
  return response;
}

// --- REDUCER STUFF --- \\



export default commentReducer = (state = initialState, action) => {
  const newState = {...state};
  switch(action.type) {
  return state
  }
}
// --- STATE SHAPE DIAGRAM --- \\
// comments: {
//   posts: {
//       <postId>: {
//           <commentId>: {
//               comment: <>,
//               User: {
//                   id: <>,
//                   username: <>,
//                   profileImageUrl: <>,
//                   following: <>
//               }
//           }
//       }
//   }
// },
