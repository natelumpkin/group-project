import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import * as followActions from "../../store/follow"
import './FollowCard.css'

const FollowCard = ({ user, followingList, currentUser }) => {

  const dispatch = useDispatch()



  // followingList is a list of everyone the current user is following
  const idList = []
  for (let user of followingList) {
    idList.push(user.id)
  }

  const followUser = (user) => {
    // console.log('followUser userId: ', user.id)
    dispatch(followActions.createNewFollow(user))
      .then(setFollowing(true))
  }

  const unfollowUser = (userId) => {
    // console.log('unfollowUser userId: ', userId)
    dispatch(followActions.deleteFollow(userId))
      .then(setFollowing(false))
  }

  // following boolean indicates whether the current user is following this card's user
  // if card's user is in the followingList, following boolean shoudl be true
  const [following, setFollowing] = useState(idList.includes(user.id))

  // console.log(following)
  // console.log(idList, 'followCards userId: ', user.id, 'currentUser.id: ', currentUser.id)

  // create following boolean with use state (reference post cards)
  // make follow/unfollow button dynamically re-render
  // display username and profile pic

  return (
    <div className="follow-card">
      <div className='follow-card-left-container'>
        <div className="follow-profile-image">
          <img src={user.profileImageUrl} />
        </div>
        <div className="follow-username">
          <p>{user.username}</p>
        </div>
      </div>
      <div className="follow-buttons-holder">
        {!following && (<div onClick={() => followUser(user)}>Follow</div>)}
        {following && (<div onClick={() => unfollowUser(user.id)}>Unfollow</div>)}
      </div>
    </div>
  )
}

export default FollowCard;
