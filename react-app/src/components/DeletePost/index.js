import { useDispatch } from "react-redux"
import { useEffect } from "react"
import './DeletePost.css'

import * as postActions from "../../store/post"

const DeletePost = ({ post, setShowModal, showModal }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    if (showModal) {
      //console.log('setting no scroll on body in profile button')
      document.body.style.overflow = 'hidden';
    }
    return () => {
      //console.log('running clean up of useeffect in profile button')
      document.body.style.overflow = 'unset';
    }
  },[showModal])

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
