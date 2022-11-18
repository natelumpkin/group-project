import { useEffect, useState } from "react"
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
  const [loaded, setLoaded] = useState(false)

  let username;
  if (allPosts) {
    console.log(Object.values(allPosts)[0])
    if (Object.values(allPosts)[0]){
      username = Object.values(allPosts)[0].User.username
    }
  }

  const dispatch = useDispatch()

  useEffect(async () => {
    await dispatch(postActions.getBlog(userId))
    if (user && user.id) await dispatch(followActions.getAllFollowing(user.id))
    setLoaded(true)
  }, [dispatch, user, userId])

  const allPostsArray = []
  for (let post in allPosts) {
    allPostsArray.unshift(allPosts[post])
  }

  if (!loaded) {
    return null
  } else {



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
}

export default UserPosts;
