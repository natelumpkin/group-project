import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import './PostCommentCard.css';
import CommentsCard from './CommentsCard.js';
import LikesCommentCard from './LikesCommentCard.js';
import CommentInput from './CommentInput.js';
import * as commentActions from "../../store/comment";
import * as likeActions from "../../store/like";


const PostCommentCard = ({postid}) => {
  const dispatch = useDispatch();
  const commentObj = useSelector(state => state.comments.posts[postid]) || []
  const comments = Object.values(commentObj)
  const likeObj = useSelector(state => state.likes.posts[postid]) || []
  const currentUser = useSelector(state => state.session) || []
  const likes = Object.values(likeObj)
  const history = useHistory();
  const [current, setCurrent] = useState(true)
  const [errors, setErrors] = useState([])

  useEffect(()=>{
    dispatch(commentActions.grabAllComments(postid))
    dispatch(likeActions.getPostLikes(postid))
  }, [dispatch])

  // if (groups.length > 1 ) {
  //   DisplayGroups =  groups.map((group) => <GroupDetail group={group}/>)



  console.log("test 1", comments)
  let displayComments;
  if (comments.length > 1) {
    displayComments = comments.map(comment => <CommentsCard key={comment.id} comment={comment}/>)
  } else {
    displayComments = (
      <>
      <div> 💬
      <h3> Be the first to Reply! </h3>
      </div>
      </>
    )
  }
  let displayLikes;
  if (likes.length>1) {
    displayLikes = likes.map(like => <LikesCommentCard key={like.id} like={like}/>)
  } else {
    displayLikes = (
      <>
      <div> 💬
      <h3> Be the first to 💖! </h3>
      </div>
      </>
    )
  }
  return (
    <div className="post-card-comment-like-container">
      <div className="post-card-comment-like-content-selector">
        <button className={current ? "post-card-comment-like-content-cards" : "post-card-comment-like-content-cards-off"} onClick={()=>setCurrent(true)}>💬</button>
        <button className={!current ? "post-card-comment-like-content-cards" : "post-card-comment-like-content-cards-off"} onClick={()=>setCurrent(false)}>💖</button>

      </div>
      <div className="post-comment-current-content-container">
         {current ? <CommentInput postid={postid} /> : null}
         {current ? displayComments : displayLikes}
      </div>

    </div>
  )
}

export default PostCommentCard;
