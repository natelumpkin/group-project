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
  // console.log("Session", sessionUser)
  // email
  // firstName
  // id
  // lastName
  // profileImageUrl
  // username

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
      return dispatch(commentActions.createPostComment(comment, postid, sessionUser))
    .then(()=>{
      setComment('')
    })
    .then(() => dispatch(commentActions.grabAllComments(postid)))
      .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors) setErrors(data.errors);
      });
  }

  let userIMG;
  if (sessionUser && sessionUser.profileImageUrl) {
    userIMG = require (sessionUser.profileImageUrl)
  } else {
    userIMG = "https://img.freepik.com/premium-vector/handdrawn-vintage-hermit-crab-vector-illustration_147266-58.jpg"
  }


return (
    // <div>
      <div className="notescard_commentinput_main_container">
        <div className="notescard_commentinput_user_icon">
          <img src={ userIMG } className="notescard_commentinput_user_image" />
        </div>
        <div className="notescard_commentinput_container">
          <form onSubmit={handleSubmit} className="notescard_commentinput_form">
          <div className="notescard_commentinput_div">
            <input
              type="textarea"
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
              required
              className="notescard_commentinput_bar"
              placeholder="Unleash Compliments!"
            />
            <button type="submit" className="notescard_commentinput_submit_button">Reply</button>

          </div>
          </form>
        </div>
      </div>
    // {/* </div> */}
)
}

export default CommentInput;
