import { useDispatch } from "react-redux"
import './DeletePost.css'

import * as postActions from "../../store/post"

const DeletePost = ({ post, setShowModal }) => {

  const dispatch = useDispatch()

  const deletePost = (postId) => {
    dispatch(postActions.deletePost(postId))
  }

  return (
    <div id="confirm-delete-form">
      <div id="confirm-delete-text">
        <h2>Are you sure you want to delete this post?</h2>
      </div>
      <div className="form-footer">
        <button className='cancel-button' onClick={() => setShowModal(false)}>Cancel</button>
        <button className='save-edit-button' onClick={() => deletePost(post.id)}>OK</button>
      </div>
    </div>
  )
}

export default DeletePost;
