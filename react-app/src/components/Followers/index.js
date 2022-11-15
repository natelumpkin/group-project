import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import * as followActions from '../../store/follow'

import FollowCard from "../FollowCard";

const Followers = () => {

  // This is a display of everyone the current use is following

  const dispatch = useDispatch();

  const followers = useSelector(state => state.follows.followers)
  const following = useSelector(state => state.follows.following)
  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(followActions.getAllFollowing(currentUser.id))
  }, [dispatch])

  // This is a list of everyone the current use is following
  const followingList = Object.values(following)
  const followerList = Object.values(followers)

  return (
    <div>
      <h1>Hello from Followers Components</h1>
      <div>
        <h4>{followerList.length} Followers</h4>
      </div>
      <div>
        {followerList.map(user => (
          <FollowCard key={user.id} user={user} followingList={followingList} currentUser={currentUser}/>
        ))}
      </div>
    </div>
  )
}

export default Followers;
