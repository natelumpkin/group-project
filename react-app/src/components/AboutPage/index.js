import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as postActions from '../../store/post'
import * as followActions from '../../store/follow'
import CreateFormBarModal from "../CreatePost/CreatePostBar"

import PostCard from "../PostCard"

const AllPosts = () => {

  // subscribe to posts reducer
  // have a spot card for each post in posts state
  const allPosts = useSelector(state => state.posts.allPosts)
  const user = useSelector(state => state.session.user)

  const dispatch = useDispatch()

  const AboutPostArray = [{

  }]


  return (
    <div className="outer-container">
      <div className="inner-container">
        {user && (
          <div>
            <CreateFormBarModal />
          </div>
        )}
        <div className="postsHolder">
        <h1 className="user-page-title post-padding">Explore!</h1>
          {allPostsArray.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllPosts;
