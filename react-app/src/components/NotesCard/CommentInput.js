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
    .then(()=>{
      setComment('')
    })
      .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors) setErrors(data.errors);
      });
  }
// figure out the User profile URL issue
// Fix Styling for reply - move into input box.

return (
    // <div>
      <div className="notescard_commentinput_main_container">
        <div className="notescard_commentinput_user_icon">
          {sessionUser ? sessionUser.profileImageUrl : "👨‍👧‍👧" }
          "❔"
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
