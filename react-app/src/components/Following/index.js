import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from "react-router-dom";
import * as followActions from '../../store/follow'
import './Following.css'

import FollowCard from "../FollowCard";

const Following = () => {

  // This is a display of everyone the current user is following

  const dispatch = useDispatch();

  const following = useSelector(state => state.follows.following)
  const currentUser = useSelector(state => state.session.user)

  const [loaded, setLoaded] = useState(false)

  useEffect( () => {
    async function fetchData() {
      await dispatch(followActions.getAllFollowing(currentUser?.id))
    }
    fetchData();
    setLoaded(true);
  }, [dispatch, currentUser])

  // Redirect users that are not logged in:
  if (!currentUser) return <Redirect to="/" />;

  // This is a list of everyone the current use is following
  const followingList = Object.values(following)

  // console.log('followingList in Following component: ', followingList)

  return (
    <div id='follow-list-container'>
      <div id='follow-list-count'>
        {loaded && (
          <h4>{followingList.length} Following</h4>
        )}
      </div>
      <div id='follow-list'>
        <div id='follow'>
          {followingList.map(user => (
            <FollowCard key={user.id} user={user} followingList={followingList} currentUser={currentUser} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Following;
