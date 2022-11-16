import { Link } from "react-router-dom";

import './NotesCard.css';


const CommentsCard = ({ comment }) => {

  return (
    <div>
    <div className="post-card-box-content-container">
      <Link to={`/users/${comment.User.id}`}>
        <div className="post-card-content-user-icon">
          {comment.User.profileImageUrl || "🤔"}
        </div>
      </Link>
      <div className="post-comment-content-box">
        <Link to={`/users/${comment.User.id}`}>
          <div>{comment.User.username}</div>
        </Link>
          <div className="post-comment-content-comment">{comment.comment} </div>
      </div>
    </div>
    <span> ... </span>
    </div>
  )
}

export default CommentsCard;
