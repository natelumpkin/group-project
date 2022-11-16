import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import './NotesCard.css';
import DeleteCommentModal from '../DeleteComment/DeleteCommentModal';
import EditCommentModal from '../EditComment/EditCommentModal';


const CommentsCard = ({ comment }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const toggleMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  let userIMG;
  if (comment.User.profileImageUrl) {
    userIMG = require (comment.User.profileImageUrl)
  } else {
    userIMG = "https://img.freepik.com/premium-vector/handdrawn-vintage-hermit-crab-vector-illustration_147266-58.jpg"
  }

  console.log('comment in commentsCard: ', comment)

  return (

    <div className="notescard_comment_main_container">
      <Link to={`/users/${comment.User.id}`}>
        <div className="notescard_comment_user_icon">
          <img src={ userIMG } className="notescard_comment_user_image" />
        </div>
      </Link>
      <div className="notescard_comment_content_container">
        <Link to={`/users/${comment.User.id}`}>
          <div className="notescard_comment_username">{comment.User.username}</div>
        </Link>
          <div className="notescard_comment_content">{comment.comment} </div>
      </div>
        <div className="notescard_comment_options_container">
          <span onClick={toggleMenu} className="notescard_comment_options_menu"> ...
          </span>
          {showMenu && (
            <div >
              <div >
                <div>
                  <button onClick={() => setShowEditModal(true)}>
                    Edit
                  </button>
                </div>
                <div>
                  <button onClick={() => setShowDeleteModal(true)}>
                  <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          )}
          <DeleteCommentModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} comment={comment}/>
          <EditCommentModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} comment={comment}/>
        </div>
    </div>

  )
}

export default CommentsCard;
