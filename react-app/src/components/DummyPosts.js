import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import * as postActions from '../store/post'

const DummyPosts = () => {
  const allPosts = useSelector(state => state.posts.allPosts)
  const userPosts = useSelector(state => state.posts.userPosts)

  const allPostsArray = []
  for (let post in allPosts) {
    allPostsArray.unshift(allPosts[post])
  }

  const userPostsArray = []
  for (let post in userPosts) {
    userPostsArray.unshift(userPosts[post])
  }

  console.log('allPosts in dummy posts: ', allPostsArray);

  return (
    <div>
      <h2>All Posts</h2>
      {allPostsArray.map(post => (
        <ul>
          <li>Id: {post.id}</li>
          <li>title: {post.title}</li>
          <li>text: {post.text}</li>
          <li>notes: {post.notes}</li>
          <li>post author: {post.User.username}</li>
          <li>Following? {post.User.following.toString()}</li>
          {post.Media.map(media => (
            <li>media url{media.mediaUrl}</li>
          ))}
        </ul>
      ))}
      <h2>User Posts</h2>
      {userPostsArray.map(post => (
        <ul>
          <li>Id: {post.id}</li>
          <li>title: {post.title}</li>
          <li>text: {post.text}</li>
          <li>notes: {post.notes}</li>
          <li>post author: {post.User.username}</li>
          <li>Following? {post.User.following.toString()}</li>
          {post.Media.map(media => (
            <li>media url{media.mediaUrl}</li>
          ))}
        </ul>
      ))}
    </div>
  )
}

export default DummyPosts;
