
import { useDispatch } from "react-redux"
import * as commentActions from '../../store/comment'

const DeleteComment = ({comment, setShowDeleteModal}) => {

  const dispatch = useDispatch()

  const deleteComment = (commentId) => {
    dispatch(commentActions.deletePostComment(commentId))
  }

  return (
    <div id="confirm-delete-form">
      <div id="confirm-delete-text">
        <h2>Are you sure you want to delete this comment?</h2>
      </div>
      <div className="form-footer">
        <button onClick={() => setShowDeleteModal(false)} className='cancel-button'>Cancel</button>
        <button onClick={() => deleteComment(comment.id)} className="save-edit-button">OK</button>
      </div>
    </div>
  )
}

export default DeleteComment;
