
import { useDispatch } from "react-redux"
import { useState } from "react"

import * as commentActions from '../../store/comment'

const EditComment = ({comment, setShowEditModal}) => {

  const dispatch = useDispatch()
  const [editedComment, setEditedComment] = useState(comment.comment);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(commentActions.editPostComment(comment.id, comment.postId, editedComment, comment.User))
    await dispatch(commentActions.grabAllComments(comment.postId))
    setShowEditModal(false);
  }

  return (
    <div>
      <h4>Edit Comment</h4>
      <form onSubmit={handleSubmit}>
      <div>
      <input
              type="textarea"
              value={editedComment}
              onChange={(e)=>setEditedComment(e.target.value)}
              required
              maxLength={255}
              className="notescard_commentinput_bar"
              placeholder="Unleash Compliments!"
            />
      </div>
      <div>
        <button type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
        <button type="submit">OK</button>
      </div>
      </form>
    </div>
  )
}

export default EditComment;
