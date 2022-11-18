import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import CreateFormBarModal from "../CreatePost/CreatePostBar"
import * as postActions from '../../store/post'
import * as followActions from '../../store/follow'

import PostCard from "../PostCard"
import './UserPosts.css'

const UserPosts = () => {
  const [feedLength, setFeedLength] = useState(10);
  const [postsToRender, setPostsToRender] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);

  const { userId } = useParams()
  const allPosts = useSelector(state => state.posts.userPosts)
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false)

  let username;
  if (allPosts) {
    if (Object.values(allPosts)[0]) {
      username = Object.values(allPosts)[0].User.username
    }
  }

  const dispatch = useDispatch()

  useEffect(() => {
   async function getData(){ dispatch(postActions.getBlog(userId))
      .then(() => setLoaded(true))
    if (user && user.id) await dispatch(followActions.getAllFollowing(user.id))
  };
  getData();

  }, [dispatch, user, userId])

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
            {username && (
              <h1 className="user-page-title post-padding">{username}'s Posts</h1>
            )}
            {!username && (
              <h1 className="user-page-title post-padding">No Posts Yet</h1>
            )}
            {postsToRender?.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default UserPosts;
