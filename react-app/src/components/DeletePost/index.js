import { useDispatch } from "react-redux"

import * as postActions from "../../store/post"

const DeletePost = ({post, setShowModal}) => {

  const dispatch = useDispatch()

  const deletePost = (postId) => {
    dispatch(postActions.deletePost(postId))
  }

  return (
    <div>
      <div>
        <h2>Are you sure you want to delete this post?</h2>
      </div>
      <div>
        <button onClick={() => setShowModal(false)}>Cancel</button>
        <button onClick={() => deletePost(post.id)}>OK</button>
      </div>
    </div>
  )
}

export default DeletePost;
