import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import CreateFormBarModal from "../CreatePost/CreatePostBar"
import * as postActions from '../../store/post'
import * as followActions from '../../store/follow'

import PostCard from "../PostCard"
import './UserPosts.css'

const UserPosts = () => {
  const { userId } = useParams()
  const allPosts = useSelector(state => state.posts.userPosts)
  const user = useSelector(state => state.session.user)

  let username;
  if (allPosts) {
    console.log(Object.values(allPosts)[0])
    if (Object.values(allPosts)[0]){
      username = Object.values(allPosts)[0].User.username
    }
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(postActions.getBlog(userId))
    if (user && user.id) dispatch(followActions.getAllFollowing(user.id))
  }, [dispatch, user, userId])

  const allPostsArray = []
  for (let post in allPosts) {
    allPostsArray.unshift(allPosts[post])
  }

  return (
    <div className="outer-container">
      <div className="inner-container">
          <div>
            <CreateFormBarModal />
          </div>
        <div className="postsHolder">
          <h1 className="user-page-title post-padding">{username}'s Posts</h1>
          {allPostsArray.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserPosts;
