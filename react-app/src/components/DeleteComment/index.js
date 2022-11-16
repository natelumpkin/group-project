
import { useDispatch } from "react-redux"

import * as commentActions from '../../store/comment'

const DeleteComment = ({comment, setShowDeleteModal}) => {

  const dispatch = useDispatch()

  const deleteComment = (commentId) => {
    dispatch(commentActions.deletePostComment(commentId))
  }

  return (
    <div>
      <div>
        <h2>Are you sure you want to delete this comment?</h2>
      </div>
      <div>
        <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
        <button onClick={() => deleteComment(comment.id)}>OK</button>
      </div>
    </div>
  )
}

export default DeleteComment;
