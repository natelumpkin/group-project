import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import * as postActions from '../../store/post'
import * as followActions from '../../store/follow'

import PostCard from "../PostCard"

const UserPosts = () => {

  const { userId } = useParams()
  // console.log('userId in UserPosts: ', userId)
  // subscribe to posts reducer
  // have a spot card for each post in posts state
  //
  const allPosts = useSelector(state => state.posts.userPosts)
  const user = useSelector(state => state.session.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(postActions.getBlog(userId))
    if (user.id) dispatch(followActions.getAllFollowing(user.id))
  }, [dispatch, user, userId])

  const allPostsArray = []
  for (let post in allPosts) {
    allPostsArray.unshift(allPosts[post])
  }

  // console.log('allPosts in UserPosts component: ', allPostsArray)

  return (
    <div className="outer-container">
      <div className="inner-container">
        <div>
          Placeholder for Form Bar
        </div>
        <div className="postsHolder">
          {allPostsArray.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserPosts;
