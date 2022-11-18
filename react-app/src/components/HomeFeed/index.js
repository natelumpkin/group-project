import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import * as postActions from '../../store/post'
import * as followActions from '../../store/follow'
import CreateFormBarModal from "../CreatePost/CreatePostBar"
import './HomeFeed.css'

import PostCard from "../PostCard"

const HomeFeed = () => {
  const [feedLength, setFeedLength] = useState(3);
  const [postsToRender, setPostsToRender] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);

  // subscribe to posts reducer
  // have a spot card for each post in posts state
  //
  const allPosts = useSelector(state => state.posts.allPosts)
  const user = useSelector(state => state.session.user)

  const dispatch = useDispatch()

  useEffect(() => {

    (async function () {
      await dispatch(postActions.getFeed())
      await dispatch(followActions.getAllFollowing(user?.id))
    })()
    setPostsLoaded(true);
  }, [dispatch, user])

  const allPostsArray = []
  for (let post in allPosts) {
    allPostsArray.unshift(allPosts[post])
  }
  const allPostsArrayLength = allPostsArray.length;

  useEffect(() => {
    setPostsToRender(allPostsArray.slice(0, feedLength));
  }, [feedLength, postsLoaded, allPosts]);

  useEffect(() => {
    const callBackFN = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (feedLength + 3 <= allPostsArrayLength) {
          setFeedLength(feedLength + 3);
        } else if (feedLength < allPostsArrayLength) {
          setFeedLength(allPostsArrayLength);
        }
      }
    }
    window.addEventListener('scroll', callBackFN);

    return function cleanup() {
      window.removeEventListener('scroll', callBackFN);
    }

  }, [allPostsArrayLength, feedLength])

  // Redirect users that are not logged in:
  if (!user) return <Redirect to="/" />;

  return (
    <div className="outer-container">
      <div className="inner-container">
        <div>
          <CreateFormBarModal />
        </div>
        <div className="postsHolder">
          <h1 className="user-page-title post-padding">Your Feed</h1>
          {postsToRender?.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeFeed;
