import { Link } from "react-router-dom";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as followActions from "../../store/follow"


import './NotesCard.css';


const LikesCommentCard = ({ like, post }) => {
  const dispatch = useDispatch()

  const currentuser = useSelector(state => state.session.user)
  const follows = useSelector(state => state.follows)

  const followingList = Object.keys(follows.following)

  const idList = []
  for (let user of followingList) {
    idList.push(user.id)
  }

  const [following, setFollowing] = useState(idList.includes(like.id))

  const followUser = (user) => {
    // console.log('followUser userId: ', user.id)
    dispatch(followActions.createNewFollow(user))
      .then(setFollowing(true))
  }
  const unfollowUser = (userId) => {
    // console.log('unfollowUser userId: ', userId)
    dispatch(followActions.deleteFollow(userId))
      .then(setFollowing(false))
  }

  let userIMG;
  if (like.profileImageUrl) {
    userIMG = require (like.profileImageUrl)
  } else {
    userIMG = "https://img.freepik.com/premium-vector/handdrawn-vintage-hermit-crab-vector-illustration_147266-58.jpg"
  }

  let displayFollow = true;
  if (currentuser && (currentuser.id === like.id)) {
    displayFollow = false
  }

  return (

    <div className="notescard_likes_main_container">
      <Link to={`/users/${like.id}`}>
        <div className="notescard_likes_user_icon">
          <img src={ userIMG } alt='user' className="notescard_like_user_image" />
        </div>
      </Link>
      <div className="notescard_likes_content_container">
        <Link to={`/users/${like.id}`}>
          <div className="notescard_likes_username">{like.username}</div>
        </Link>
      </div>
        <div className="notescard_likes_followbutton_container">
          {displayFollow ? <span className="notescard_likes_followbutton">

          {!following && (<button onClick={() => followUser(like)}>Follow</button>)}
          {following && (<button onClick={() => unfollowUser(like.id)}>Unfollow</button>)}
          </span>: null}
        </div>
    </div>

  )
}

export default LikesCommentCard;
