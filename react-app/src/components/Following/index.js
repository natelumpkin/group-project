import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from "react-router-dom";
import * as followActions from '../../store/follow'

import FollowCard from "../FollowCard";

const Following = () => {

  // This is a display of everyone the current user is following

  const dispatch = useDispatch();

  const following = useSelector(state => state.follows.following)
  const currentUser = useSelector(state => state.session.user)

  const [loaded, setLoaded] = useState(false)

  useEffect(async () => {
    await dispatch(followActions.getAllFollowing(currentUser?.id))
    setLoaded(true);
  }, [dispatch])

  // Redirect users that are not logged in:
  if (!currentUser) return <Redirect to="/" />;

  // This is a list of everyone the current use is following
  const followingList = Object.values(following)

  // console.log('followingList in Following component: ', followingList)

  return (
    <div>
      <div>
        {loaded && (
          <h4>{followingList.length} Following</h4>
        )}
      </div>
      <div>
        {followingList.map(user => (
          <FollowCard key={user.id} user={user} followingList={followingList} currentUser={currentUser}/>
        ))}
      </div>
    </div>
  )
}

export default Following;
