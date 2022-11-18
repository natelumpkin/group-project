import { useDispatch } from "react-redux"
import { useState } from "react"
import './EditComment.css'

import * as commentActions from '../../store/comment'

const EditComment = ({ comment, setShowEditModal }) => {

  const dispatch = useDispatch()
  const [editedComment, setEditedComment] = useState(comment.comment);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(commentActions.editPostComment(comment.id, comment.postId, editedComment, comment.User))
    await dispatch(commentActions.grabAllComments(comment.postId))
    setShowEditModal(false);
  }

  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px");
    tx[i].addEventListener("input", OnInput);
  }
  function OnInput() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + "px";
  }

  return (
    <div className="edit_comment_main_container">
      <h4>Edit Comment</h4>
      <form onSubmit={handleSubmit}>
        <div id="comment-edit-input-container">
          <textarea
            type="textarea"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            required
            rows={1}
            maxLength={255}
            className="notescard_commentinput_bar"
            placeholder="Unleash Compliments!"
          />
        </div>
        <div className='form-footer'>
          <button className='cancel-button' type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
          <button className='save-edit-button' type="submit">OK</button>
        </div>
      </form>
    </div>
  )
}

export default EditComment;
