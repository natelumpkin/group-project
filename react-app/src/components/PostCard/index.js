import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import React from "react"
import ReactPlayer from "react-player"

import formatVideoLink from "../../utils/formatVideoLink"
import PostCommentCard from "../PostCommentCard"
import './PostCard.css'
import * as followActions from "../../store/follow"
import * as postActions from "../../store/post"
import * as likeActions from "../../store/like"
import * as commentActions from "../../store/comment"

const PostCard = ({ post }) => {

  console.log('postCard component post: ', post)

  const user = useSelector(state => state.session.user)
  // const posts = useSelector(state => state.posts)
  const follows = useSelector(state => state.follows)
  const likes = useSelector(state => state.likes)
  const comments = useSelector(state => state.comments)
  const dispatch = useDispatch()

  const defaultProfileImage = "https://img.freepik.com/premium-vector/handdrawn-vintage-hermit-crab-vector-illustration_147266-58.jpg?w=360"

  useEffect(() => {
    dispatch(likeActions.getPostLikes(post.id))
    dispatch(commentActions.grabAllComments(post.id))
  }, [dispatch])

  const followUser = (userId) => {
    dispatch(followActions.createNewFollow(userId))
    // .then(dispatch(postActions.getAllPosts()))
  }

  const likePost = (postId) => {
    dispatch(likeActions.addPostLike(postId))
  }

  const removeLikeFromPost = (postId) => {
    dispatch(likeActions.removePostLike(postId))
  }

  // console.log(likes.posts[post.id])
  const emptyObject = {}
  console.log(Object.keys(emptyObject))
  console.log('comments: ', comments)
  let numComments
  let notes
  if (comments.posts[post.id]) {
    console.log('comments.posts[post.id]: ', comments.posts[post.id])
    numComments = Object.keys(comments.posts[post.id]).length
  }

  const likedList = []
  for (let userId in likes.posts[post.id]) {
    likedList.push(userId)
  }
  // const numComments = comments.length;
  const numLikes = likedList.length;
  if (numComments) {
    notes = numLikes + numComments
  } else {
    notes = 'Loading...'
  }
  // const notes = numComments + numLikes;
  console.log('post number ', post.id, ' notes: ', notes)
  // const likedList = Object.keys(likes.posts[post.Id])
  console.log('likedList: ', likedList)
  const followingList = Object.keys(follows.following)
  // console.log('following list: ', followingList)
  const following = followingList.includes(post.User.id.toString())
  // console.log('postId: ', post.id, 'current user following: ', following);



  // if postType is text,
  // only render title and text
  // if postType is quote,
  // only render title and text
  // if postType is image,
  // only render image and text
  // if postType is video,
  // only render video and text

  if (post.postType === 'text') {
    return (
      <div className="postCard-outer-container">
        <div className="postCard-userImage-holder">
          <div className="postCard-userImage">
            <img src={post.User.profileImageUrl || defaultProfileImage} />
            {/* Post Id: {post.id}
            Post type: {post.postType} */}
          </div>
        </div>
        <div className="postCard-content-holder">
          <div className="postCard-author-username-holder">
            <Link to={`/users/${post.User.id}`}>
              {post.User.username}
            </Link>
            {/* If following is false and there is session.user.id and post.User.id is not currentUser.id, then render the follow button */}
            {!following && user.id && post.User.id != user.id && (
              <button onClick={() => followUser(post.User)}>Follow</button>
            )}
          </div>
          <div className="postcard-title-holder">
            <h2>{post.title}</h2>
          </div>
          <div className="postcard-text-holder">
            <p>{post.text}</p>
          </div>
          <div className="postcard-edit-delete-holder">
            <button>Delete</button>
            <button>Edit</button>
          </div>
          <div>
            <div className="postcard-notes-holder">
              {notes > 0 && (
                <div>{notes} notes</div>
              )}
            </div>
            <div className="postcard-comments-likes-holder">
              <button>Reply</button>
              <button>Like</button>
            </div>
          </div>
          {/* <div><PostCommentCard postid={post.id} /></div> */}
        </div>
      </div>
    )
  } else if (post.postType === "quote") {
    return (
      <div className="postCard-outer-container">
        <div className="postCard-userImage-holder">
          <div className="postCard-userImage">
            <img src={post.User.profileImageUrl || defaultProfileImage} />
            {/* Post Id: {post.id}
            Post type: {post.postType} */}
          </div>
        </div>
        <div className="postCard-content-holder">
          <div className="postCard-author-username-holder">
            <Link to={`/users/${post.User.id}`}>
              {post.User.username}
            </Link>
            {!following && user.id && post.User.id != user.id && (
              <button onClick={() => followUser(post.User)}>Follow</button>
            )}
          </div>
          <div className="postcard-quote-holder">
            <h2>{post.title}</h2>
          </div>
          <div className="postcard-source-holder">
            <p>{post.text}</p>
          </div>
          <div className="postcard-edit-delete-holder">
            <button>Delete</button>
            <button>Edit</button>
          </div>
          <div>
            <div className="postcard-notes-holder">
              {notes > 0 && (
                <div>{notes} notes</div>
              )}
            </div>
            <div className="postcard-comments-likes-holder">
              <button>Reply</button>
              <button>Like</button>
            </div>
          </div>
          {/* <div><PostCommentCard postid={post.id} /></div> */}
        </div>
      </div>
    )
  } else if (post.postType === 'image' || post.postType === 'photo') {
    return (
      <div className="postCard-outer-container">
        <div className="postCard-userImage-holder">
          <div className="postCard-userImage">
            <img src={post.User.profileImageUrl || defaultProfileImage} />
            {/* Post Id: {post.id}
            Post type: {post.postType} */}
          </div>
        </div>
        <div className="postCard-content-holder">
          <div className="postCard-author-username-holder">
            <Link to={`/users/${post.User.id}`}>
              {post.User.username}
            </Link>
            {!following && user.id && (post.User.id != user.id) && (
              <button onClick={() => followUser(post.User)}>Follow</button>
            )}
          </div>
          <div className="postcard-photo-holder">
            {post.Media[0] && (<img src={post.Media[0].mediaUrl} />)}
          </div>
          <div className="postcard-caption-holder">
            <p>{post.text}</p>
          </div>
          <div className="postcard-edit-delete-holder">
            <button>Delete</button>
            <button>Edit</button>
          </div>
          <div>
            <div className="postcard-notes-holder">
              {notes > 0 && (
                <div>{notes} notes</div>
              )}
            </div>
            <div className="postcard-comments-likes-holder">
              <button>Reply</button>
              <button>Like</button>
            </div>
          </div>
          {/* <div><PostCommentCard postid={post.id} /></div> */}
        </div>
      </div>
    )
  } else if (post.postType === 'video') {

    let formattedLink;
    if (post.Media[0]) {
      const videoLink = post.Media[0].mediaUrl;
      formattedLink = formatVideoLink(videoLink)
    }

    return (
      <div className="postCard-outer-container">
        <div className="postCard-userImage-holder">
          <div className="postCard-userImage">
            <img src={post.User.profileImageUrl || defaultProfileImage} />
            {/* Post Id: {post.id}
            Post type: {post.postType} */}
          </div>
        </div>
        <div className="postCard-content-holder">
          <div className="postCard-author-username-holder">
            <Link to={`/users/${post.User.id}`}>
              {post.User.username}
            </Link>
            {!following && user.id && post.User.id != user.id && (
              <button onClick={() => followUser(post.User)}>Follow</button>
            )}
          </div>
          <div className="postcard-video-holder">
            {post.Media[0] && (
              <ReactPlayer url={post.Media[0].mediaUrl} controls={true}></ReactPlayer>)}
          </div>
          <div className="postcard-caption-holder">
            <p>{post.text}</p>
          </div>
          <div className="postcard-edit-delete-holder">
            <button>Delete</button>
            <button>Edit</button>
          </div>
          <div>
            <div className="postcard-notes-holder">
              {notes > 0 && (
                <div>{notes} notes</div>
              )}
            </div>
            <div className="postcard-comments-likes-holder">
              <button>Reply</button>
              <button>Like</button>
            </div>
          </div>
          {/* <div><PostCommentCard postid={post.id} /></div> */}
        </div>
      </div>
    )
  }
  else {
    return (
      <h2>{post.postType}</h2>
    )
  }
}


export default PostCard;
