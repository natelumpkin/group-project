
import { useSelector, useDispatch } from "react-redux"
import CreateFormBarModal from "../CreatePost/CreatePostBar"
import { Link } from "react-router-dom"
import React from "react"

// import formatVideoLink from "../../utils/formatVideoLink"
import NotesCard from "../NotesCard"
import DeletePostModal from "../DeletePost/DeletePostModal"
import EditPostModal from '../EditPost/EditPostModal'

const AboutPage = () => {

  // subscribe to posts reducer
  // have a spot card for each post in posts state
  // const allPosts = useSelector(state => state.posts.allPosts)
  const user = useSelector(state => state.session.user)

  const dispatch = useDispatch()

  const post = {
    Media: [],
    User: {
      following: false,
      id: 1,
      profileImageUrl: 'https://i.imgur.com/twMKSWE.png',
      username: 'team scuttlr'
    },
    id: 0,
    notes: 0,
    postType: 'text',
    title: 'Welcome to scuttlr!',
    text: 'We are Brad, Nate, Max, and David! This is a simple demo site to showcase our skills as engineers - check out our profiles in the footer! Feel free to make a user and post away, or use the demo user at the top to interact with the site. Have fun!',
    userId: 1
  }


  return (
    <div className="outer-container">
      <div className="inner-container">
        {user && (
          <div>
            <CreateFormBarModal />
          </div>
        )}
        <div className="postsHolder">
          <h1 className="user-page-title post-padding">About Us</h1>
          <div className="postCard-outer-container">
            <div className="postCard-userImage-holder">
              <div className="postCard-userImage">
                <img alt='profile' src={post.User.profileImageUrl} />
                {/* Post Id: {post.id}
            Post type: {post.postType} */}
              </div>
            </div>
            <div className="postCard-content-holder top-padding">
              <div className="postCard-author-username-holder post-padding">

                {post.User && (
                  post.User.username
                )}

                {/* If following is false and there is session.user.id and post.User.id is not currentUser.id, then render the follow button */}

              </div>
              <div className="postcard-title-holder post-padding">
                <h2>{post.title}</h2>
              </div>
              <div className="postcard-text-holder post-padding">
                <p>{post.text}</p>
              </div>
              <div className="postcard-edit-delete-holder post-padding">

              </div>

              <div className="postcard-bottom-container post-padding">
                <div className="postcard-notes-holder">

                  <div className="postcard-notes-holder notes-button"></div>

                </div>

              </div>
              <div></div>
              {/* {showModal && (<LoginFormModal showModal={showModal} setShowModal={setShowModal} />)} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage;
