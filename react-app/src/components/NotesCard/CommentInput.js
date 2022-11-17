import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

        if (data && data.errors) {
          setErrors(data.errors);
          console.log(errors);
        }
      });
  }

  let userIMG;
  if (sessionUser && sessionUser.profileImageUrl) {
    userIMG = sessionUser.profileImageUrl
  } else {
    userIMG = "https://img.freepik.com/premium-vector/handdrawn-vintage-hermit-crab-vector-illustration_147266-58.jpg"
  }

  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px");
    tx[i].addEventListener("input", OnInput, false);
  }
  function OnInput() {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
  }
  // const txHeight = 24;
  // const tx = document.getElementsByTagName("textarea");

  // for (let i = 0; i < tx.length; i++) {
  //   if (tx[i].value == '') {
  //     tx[i].setAttribute("style", "height:" + txHeight + "px");
  //   } else {
  //     tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px");
  //   }
  //   tx[i].addEventListener("input", OnInput, false);
  // }

  // function OnInput(e) {
  //   this.style.height = 0;
  //   this.style.height = (this.scrollHeight) + "px";
  // }

return (
    // <div>
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
                autoFocus="true"
                maxLength="250"
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                required
                className="notescard_commentinput_bar"
                placeholder="Unleash Compliments!"
              />
              <button type="submit" className="notescard_commentinput_submit_button"><span>Reply</span></button>
            </form>
          </div>
        </div>
      </div>
    // {/* </div> */}
)
}

export default CommentInput;
