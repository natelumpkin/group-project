const PostCard = ({post}) => {

  console.log('postCard component post: ', post)

  return (
    <div className="postCard-outer-container">
      <div className="postCard-userImage-holder">
        <div className="postCard-userImage">
          <img src={post.User.profileImageUrl}/>
          Profile Image Placeholder
        </div>
      </div>
      <div className="postCard-content-holder">
        <div className="postCard-author-username-holder">
          {post.User.username}
        </div>
      </div>
    </div>
  )
}

export default PostCard;
