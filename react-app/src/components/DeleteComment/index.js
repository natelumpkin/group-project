
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import * as commentActions from '../../store/comment'

const DeleteComment = ({comment, setShowDeleteModal, showDeleteModal}) => {

  const dispatch = useDispatch()

  useEffect(() => {
    if (showDeleteModal) {
      //console.log('setting no scroll on body in profile button')
      document.body.style.overflow = 'hidden';
    }
    return () => {
      //console.log('running clean up of useeffect in profile button')
      document.body.style.overflow = 'unset';
    }
  },[showDeleteModal])

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
