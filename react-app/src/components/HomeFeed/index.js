import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as postActions from '../../store/post'
import * as followActions from '../../store/follow'
import CreateFormBarModal from "../CreatePost/CreatePostBar"
import './HomeFeed.css'

import PostCard from "../PostCard"

const HomeFeed = () => {

  // subscribe to posts reducer
  // have a spot card for each post in posts state
  //
  const allPosts = useSelector(state => state.posts.allPosts)
  const user = useSelector(state => state.session.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(postActions.getFeed())
    dispatch(followActions.getAllFollowing(user.id))
  }, [dispatch])

  const allPostsArray = []
  for (let post in allPosts) {
    allPostsArray.unshift(allPosts[post])
  }

  // console.log('allPosts in userFeed component: ', allPostsArray)

  return (
    <div className="outer-container">
      <div className="inner-container">
        <div>
          <CreateFormBarModal />
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

export default HomeFeed;
