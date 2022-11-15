import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import './PostCommentCard.css';
import * as commentActions from "../../store/comment";


const PostCommentCard = ({postId}) => {
  const dispatch = useDispatch();
  const commentObj = useSelector(state => state.posts[postId])
  const comments = Object.values(commentObj)
  const history = useHistory();
  const [errors, setErrors] = useState([])

  useEffect(()=>{
    dispatch(commentActions.getAllPosts(postId))
  }, [dispatch])

  let displayComments;
  if (comments.length>1) {
    displayComments = comments.map(comment => (
      <div className="post-comment-content-container">
        <div className="post-comment-content-user-icon">
          comment.User.profileImageUrl
        </div>
        <div className="post-comment-content-box">
          <div>comment.User.username</div>
          <div className="post-comment-content-comment">comment.comment </div>
        </div>
      </div>
    ))
  }  else {
    displayComments = (
      <>
      <h2> Be the first to Reply! </h2>
      </>
    )
  }
  return (

    <div className="post-comment-container">
      <div className="post-comment-content-selector">
        💬Comment Count
      </div>
      <div className="post-comment-input-container">
        <div className="post-comment-user-icon"> </div>
        <div className="post-comment-input-field"><input></input> </div>
      </div>
      <div className="post-comment-content-container"> {displayComments} </div>

    <div>
  )
}
