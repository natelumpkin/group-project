import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as postActions from '../../store/post'
import * as followActions from '../../store/follow'
import CreateFormBarModal from "../CreatePost/CreatePostBar"

import PostCard from "../PostCard"

const AllPosts = () => {
  const [feedLength, setFeedLength] = useState(3);
  const [postsToRender, setPostsToRender] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);

  // subscribe to posts reducer
  // have a spot card for each post in posts state
  const allPosts = useSelector(state => state.posts.allPosts)
  const user = useSelector(state => state.session.user)

  const dispatch = useDispatch()

  useEffect(() => {
    (async function() {
      await dispatch(postActions.getAllPosts());
      setPostsLoaded(true);
    })()
    if (user && user.id) dispatch(followActions.getAllFollowing(user.id))
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
          {postsToRender?.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        {/* <button onClick={() => setFeedLength(feedLength + 2)}>Load more</button> */}
      </div>
    </div>
  )
}

export default AllPosts;
