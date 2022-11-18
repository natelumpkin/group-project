import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './NotesCard.css';
import * as commentActions from "../../store/comment";
import newQuote from "./kindness_repo.js"


const CommentInput = ({ postid }) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const [comment, setComment] = useState('');
  const [valid, setValid] = useState(false)
  const [errors, setErrors] = useState([]);
  const [quote, setQuote] = useState('')

  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px");
    tx[i].addEventListener("input", OnInput, false);
  }
  function OnInput() {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
  }

  const handleChangeText = (e) => {
    // e.preventDefault();
    let textValid = e.target.value ? true : false;
    setValid(textValid)
    setComment(e.target.value)
    // console.log(comment)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
      return dispatch(commentActions.createPostComment(comment, postid, sessionUser))
    .then(()=>{
      setComment('')
      setValid(false)
      tx[0].setAttribute("style", "height:18px");
    })
    .then(() => dispatch(commentActions.grabAllComments(postid)))
      .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors) {
          setErrors(data.errors);
          console.log(errors);
        }
      });
  }
  // let currentQuote = newQuote()
  let userIMG;
  // useEffect(()=>{

  //   setQuote(currentQuote)
  // }, quote)


  if (sessionUser && sessionUser.profileImageUrl) {
    userIMG = sessionUser.profileImageUrl
  }

return (
      <div className="notescard_commentinput_main_container">
        <div className="notescard_commentinput_user_icon">
          <img src={ userIMG } alt='user' className="notescard_commentinput_user_image" />
        </div>
        <div className="notescard_commentinput_container">
          <div className="notescard_commentinput_div">
            <form onSubmit={handleSubmit} className="notescard_commentinput_form">
              <textarea
                type="text"
                require="true"
                name="Comment Form"
                rows="1"
                wrap="hard"
                maxLength="250"
                value={comment}
                onChange={(e)=>handleChangeText(e)}
                required
                className="notescard_commentinput_bar"
                placeholder={quote}
              />
              <button
                type="submit"
                disabled={!valid}
                className={valid ? "notescard_commentinput_submit_button_valid" :"notescard_commentinput_submit_button"}>
                  <span>
                    Reply
                  </span>
              </button>
            </form>
          </div>
        </div>
      </div>
)
}

export default CommentInput;
