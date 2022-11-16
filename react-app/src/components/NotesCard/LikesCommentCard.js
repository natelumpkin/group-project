import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as followActions from "../../store/follow"


import './NotesCard.css';


const LikesCommentCard = ({ like, post }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const follows = useSelector(state => state.follows)
  const followUser = (user) => {
    dispatch(followActions.createNewFollow(user))
  }

  const followingList = Object.keys(follows.following)
  const following = followingList.includes(post.User.id.toString())




  let userIMG;
  if (like.profileImageUrl) {
    userIMG = require (like.profileImageUrl)
  } else {
    userIMG = "https://img.freepik.com/premium-vector/handdrawn-vintage-hermit-crab-vector-illustration_147266-58.jpg"
  }

  return (

    <div className="notescard_likes_main_container">
      <Link to={`/users/${like.id}`}>
        <div className="notescard_likes_user_icon">
          <img src={ userIMG } className="notescard_like_user_image" />
        </div>
      </Link>
      <div className="notescard_likes_content_container">
        <Link to={`/users/${like.id}`}>
          <div className="notescard_likes_username">{like.username}</div>
        </Link>
          <div className="notescard_likes_followbutton">{like.following} </div>
      </div>
        <div className="notescard_likes_options_container">
          <span className="notescard_likes_options_menu">
          {user && !following && user.id && post.User.id != user.id && (
              <button onClick={() => followUser(post.User)}>Follow</button>
            )}
          </span>
        </div>
    </div>

  )
}

export default LikesCommentCard;
