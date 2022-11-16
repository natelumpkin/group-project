import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink, Link } from "react-router-dom";
import './NotesCard.css';
import * as commentActions from "../../store/comment";


const CommentInput = ({ postid }) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
      return dispatch(commentActions.createPostComment(comment, postid, sessionUser))
    // .then(()=>{
    //   What to do...
    // })
      .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors) setErrors(data.errors);
      });
  }

return (
    <div>
      <div className="post-comment-main-container">
        <div className="post-card-content-user-icon">
          {sessionUser ? sessionUser.profileImageUrl : "👨‍👧‍👧" }
          "❔"
        </div>
        <div className="post-comment-input-container">
          <form onSubmit={handleSubmit} className="post-comment-form">
          <div className="post-comment-input-field">
            <input
              type="test"
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
              required
              className="post-comment-input-bar"
              placeholder="Unleash Compliments!"
            />
            <button type="submit">Reply</button>

          </div>
          </form>
        </div>
      </div>
    </div>
)
}

export default CommentInput;
